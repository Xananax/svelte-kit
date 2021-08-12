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
  let list: PostMetadata[]
  const dict = {} as Record<PostMetadata['slug'], PostMetadata>
  const getModules = async () => {
    if (!list) {
      const modules = Object.entries(globbed)
      list = await Promise.all(
        modules.map(([path, resolver]) =>
          load(path, resolver).then((metadata) => {
            dict[metadata.slug] = metadata
            return metadata
          })
        )
      )
    }
    return { list, dict }
  }
  return getModules
}
