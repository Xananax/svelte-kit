import { join } from 'path'

export const defaults = {
  extensions: ['.svelte.md', '.md', '.svx'],
  dir: `$lib`,
  list: []
}

/**
 * Injects global imports in all your mdsvex files
 * Specify:
 * - the root dir (defaults to `src/lib`)
 * - the array list of components (with extension)
 * - the valid extensions list as an array (defaults to `['.svelte.md', '.md', '.svx']`)
 * @param {Object} options options described above
 * @returns a preprocessor suitable to plug into the `preprocess` key of the svelte config
 */
export const mdsvexGlobalComponents = (options = {}) => {
  const { extensions, dir, list } = { ...defaults, ...options }
  const extensionsRegex = new RegExp('(' + extensions.join('|').replace(/\./g, '\\.') + ')$', 'i')

  if(!list || !list.length || !Array.isArray(list)){
    throw new Error(`"list" option must be an array and contain at least one element`)
  }

  const imports = list
    .map((f) => join(dir, f))
    .map((path) => `import ${path.split('/').pop().replace('.svelte', '')} from "${path}"`)
    .join('\n')

  const preprocessor = {
    script({ content, filename }) {
      if (!filename.match(extensionsRegex)) {
        return { code: content }
      }
      return { code: `${imports}\n${content}` }
    }
  }
  return preprocessor
}