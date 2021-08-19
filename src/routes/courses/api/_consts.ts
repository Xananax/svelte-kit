import { dirname, basename, join } from '$lib/path'
import { makeMetadata } from '$lib/makeMetadata'

const unprocessedPages = import.meta.globEager('../../../posts/**/*.{md,svx,svelte.md}')
const toNormalizedPath = (path: string) => path.replace(/^(\.\.\/)+posts/, '')
const pagePathToSlug = (path: string) =>
  path.replace(/(\/index)?\.(md|svx|svelte\.md)$/, '').replace(/\/chapters\//, '/')
export const toFilename = (path: string) => join(dirname(import.meta.url), path)

const root = basename(dirname(dirname(import.meta.url)))
const rootRegex = new RegExp(`^\\/${root}`)
export const toAPIPath = (path: string) => path.replace(rootRegex, `/${root}/api`)
export const toHref = (slug: string) => `/${root}/${slug}`

const toSlug = (normalizedPath, metadata: PostMetadata) =>
  metadata.slug ?? pagePathToSlug(normalizedPath)

export const loadPages = (getFileTime?: (path: string, metadata: PostMetadata) => number) => {
  const children = {} as Record<PostMetadata['slug'], PostMetadata[]>

  const pages = Object.entries(unprocessedPages).reduce((obj, [path, { metadata }]) => {
    const data = makeMetadata({ path, metadata, toSlug, toNormalizedPath, getFileTime })
    const { slug, root } = data
    obj[slug] = data
    ;(children[root] = children[root] || []).push(data)
    return obj
  }, {} as Record<PostMetadata['slug'], PostMetadata>)

  Object.entries(children).forEach(([slug, children]) => slug && (pages[slug].children = children))

  return { children, pages }
}
