import { makeModuleLoader } from '$lib/makeModuleLoader'
import { loadPostMetadata } from '$lib/loadPostMetadata'
import { strip } from '$lib/path'

export const loadPostList = (root: string, globbed: ImportMetaModules) => {
  const slugFromPath = (path: string) => root + strip(path.replace(/^\.+|(\/index\.md|\.md)$/g, ''))
  const load = loadPostMetadata(slugFromPath)
  const getModules = makeModuleLoader(globbed, load)
  return getModules
}
