import { makeModuleLoader } from '$lib/makeModuleLoader'
import { loadPostMetadata } from '$lib/loadPostMetadata'
import { basename } from '$lib/path'

export const loadPostList = (globbed: ImportMetaModules) => {
  const slugFromPath = (path: string) => basename(path.replace('/index.md', ''))
  const load = loadPostMetadata(slugFromPath)
  const getModules = makeModuleLoader(globbed, load)
  return getModules
}
