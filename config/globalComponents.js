//@ts-check
import MagicString from 'magic-string'
import { writeFileSync } from 'fs'
const escapeRegExp = (/** @type {string} */ str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const regUnion = (/** @type {string[]} */ arr, capture = '') =>
  `(${capture}` + arr.map(escapeRegExp).join('|') + ')'

/**
 *
 * @param {string[]} imports
 * @param {string[]} globals
 * @param {string[]} exports
 * @returns
 */
const fileTemplate = (imports, globals, exports) =>
  `
// GENERATED FILE -- DO NOT TOUCH

${imports.join('\n')}

declare global {
  ${globals.join('\n\t')}
}

export { ${exports.join(', ')} }
`

/**
 * @typedef {Object} GlobalComponentOptions
 * @property {string[]} extensions the valid extensions list as an array (defaults to `['.svelte.md', '.md', '.svx']`)
 * @property {string[]} skipDirs directories to skip (this may remain empty)
 * @property {string[]} list the array list of components, like `['$lib/ComponentA.svelte', '$lib/ComponentB.svelte', ... ]`
 * @property {string} realFilePath the config file (defaults to `src/lib/globalImports.ts`)
 * @property {string} importPath the file path as an import (defaults to `$lib/globalImports`)
 *
 */

/** @type {GlobalComponentOptions} */
const globalComponentsOptionDefaults = {
  extensions: ['.svelte.md', '.md', '.svx'],
  skipDirs: [`src/components`, `src/lib/components`],
  importPath: `$lib/globalImports`,
  realFilePath: `src/lib/globalImports.ts`,
  list: []
}

const builtInDirs = [`.svelte-kit`, 'node_modules']

/**
 * Injects global imports in all your mdsvex files
 * Specify:
 *
 * @param {Partial<GlobalComponentOptions>} options options
 * @returns a preprocessor suitable to plug into the `preprocess` key of the svelte config
 */
export const mdsvexGlobalComponents = (options = {}) => {
  const { extensions, realFilePath, importPath, list, skipDirs } = {
    ...globalComponentsOptionDefaults,
    ...options
  }
  const extensionsRegex = new RegExp(regUnion(extensions) + '$', 'i')
  const dirsRegex = new RegExp(regUnion([...skipDirs, ...builtInDirs]) + `\\/.*?\\.svelte$`, 'i')

  if (!list || !list.length || !Array.isArray(list)) {
    throw new Error(`"list" option must be an array and contain at least one element`)
  }
  const header = (() => {
    const imports = []
    const globals = []
    const exports = []
    const names = []
    list.map((componentPath) => {
      const [, name] = (componentPath && componentPath.match(/\/?([^\/]*?)\.svelte$/)) || []
      imports.push(`import _${name} from '${componentPath}';`)
      globals.push(`const ${name}: typeof _${name};`)
      exports.push(`_${name} as ${name}`)
      names.push(name)
    })
    const fileContents = fileTemplate(imports, globals, exports)

    writeFileSync(realFilePath, fileContents, 'utf8')

    console.log(`wrote file ${realFilePath}`)
    return `import { ${names.join(', ')} } from "${importPath}";\n\n`
  })()

  const preprocessor = {
    /**
     *
     * @param {{content: string, attributes: Record<string, string | boolean>, markup: string, filename?: string}} thing
     * @returns
     */
    async script(thing) {
      const { content, filename, attributes, markup } = thing
      if (!filename.match(extensionsRegex) || dirsRegex.test(filename)) {
        return { code: content }
      }
      const hasModuleContext = /^<script.+?context="module"/.test(markup)
      /** each file is processed twice? */
      const isCurrentPassModule = attributes.context === 'module'
      /**
       * if file has a module, prefer the module context. Otherwise, add the header to the
       * non-module context
       */
      const isCurrentPassValid = (hasModuleContext && isCurrentPassModule) || !hasModuleContext
      if (!isCurrentPassValid) {
        return { code: content }
      }
      const s = new MagicString(content)
      s.prepend(header)
      return {
        code: s.toString(),
        map: s.generateMap()
      }
    }
  }
  return preprocessor
}
