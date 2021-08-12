declare global {
  interface ImportMeta {
    glob(pattern: string): ImportMetaModules
    globEager(pattern: string): ImportMetaModules
  }
}

interface ModuleLoader {
  (path: string, resolver: () => Promise<SvelteModule>): Promise<PostMetadata>
}

export const makeModuleLoader = (globbed: ImportMetaModules, load: ModuleLoader) => {
  let loadedModules: PostMetadata[]
  const loadedModulesObject = {} as Record<PostMetadata['slug'], PostMetadata>
  const getModules = async () => {
    if (!loadedModules) {
      const modules = Object.entries(globbed)
      loadedModules = await Promise.all(
        modules.map(([path, resolver]) =>
          load(path, resolver).then((metadata) => {
            loadedModulesObject[metadata.slug] = metadata
            return metadata
          })
        )
      )
    }
    return loadedModules
  }
  getModules.dict = loadedModulesObject
  return getModules
}
