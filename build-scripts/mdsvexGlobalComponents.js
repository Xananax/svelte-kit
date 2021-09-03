export const defaults = {
  extensions: ['.svelte.md', '.md', '.svx'],
  file: `$/lib/MarkdownImports.ts`,
  list: []
}

/**
 * Injects global imports in all your mdsvex files
 * Specify:
 * - the config file (defaults to `$/lib/MarkdownImports.ts`)
 * - the array list of components, like `['Component']`
 * - the valid extensions list as an array (defaults to `['.svelte.md', '.md', '.svx']`)
 *
 * @param {Object} options options described above
 * @returns a preprocessor suitable to plug into the `preprocess` key of the svelte config
 */
export const mdsvexGlobalComponents = (options = {}) => {
  const { extensions, file, list } = { ...defaults, ...options }
  const extensionsRegex = new RegExp('(' + extensions.join('|').replace(/\./g, '\\.') + ')$', 'i')

  if (!list || !list.length || !Array.isArray(list)) {
    throw new Error(`"list" option must be an array and contain at least one element`)
  }

  const header = `import { ${list.join(', ')} } from "${file}";\n`

  const preprocessor = {
    async script(thing) {
      const { content, filename, attributes, markup } = thing
      if (!filename.match(extensionsRegex)) {
        return { code: content }
      }
      const hasModuleContext = /^<script context="module">/.test(markup)
      const isModulePass = attributes?.context === 'module'
      const isValidPass = (hasModuleContext && isModulePass) || !hasModuleContext
      if (!isValidPass) {
        return { code: content }
      }
      const code = `${header}\n${content}`
      return { code }
    }
  }
  return preprocessor
}
