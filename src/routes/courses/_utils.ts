import { strip } from '$lib/path'
import { base } from '$app/paths'
import { dayjs } from '$lib/dayjs'

export const toNormalizedPath = (path: string) => path.replace(/^(\.\/)/, '')
export const pagePathToSlug = (path: string) => path.replace(/(\/index)?\.(md|svx|svelte\.md)$/, '')

export const toAPIPath = (path: string) => `/${strip(path)}.json`
export const toHref = (slug: string) => `/courses/${slug}`

export const slugToTitle = (slug: string) => slug?.replace(/-|_/g, ' ')

export const toSlug = (normalizedPath: string, metadata: PostMetadata) =>
  metadata.slug ?? pagePathToSlug(normalizedPath)

/**
 * This is a _client_ method which re-augments the date with a DayJS object, after
 * receiving the date as a string. It is _not_ to be used server-side, since DayJS
 * cannot be serialized as JSON
 * @param metadata A post
 * @returns An augmented post
 */
export const augmentMetadata = (metadata: PostMetadata): PostMetadataAugmented => {
  const { date, slug, children } = metadata
  const href = `${base}${toHref(slug)}`
  return {
    ...metadata,
    href,
    date: dayjs(date),
    children: children.map(augmentMetadata)
  }
}
