import { dayjs } from '$lib/dayjs'
import { base } from '$app/paths'
import { strip } from '$lib/path'

const getFileTime = () => Date.now()

export type MetadataMakerOptions = {
  path: string
  metadata: SvelteModule['metadata']
  toNormalizedPath: (path: string, metadata: SvelteModule['metadata']) => string
  toSlug: (normalizedPath: string, metadata: SvelteModule['metadata']) => string
  toHref: (slug: string, normalizedPath: string, metadata: SvelteModule['metadata']) => string
}

/**
 * Takes a Svelte Components metadata, and normalizes it.
 * While the Typescript type will try to force you to have a few mandatory
 * properties in your metadata, the function can actually derive valid schema
 * from the `path` property and makes no assumptions about the shape of `metadata`,
 * to allow for sloppy data entry.
 * You do need a `metadata` property though, even if empty.
 *
 * This function is made generic by depInjecting methods for normalizing the path,
 * creating a slug from that normalized path, and to transform the slug to Href
 * @param options
 * @returns
 */
export const makeMetadata = ({
  path,
  metadata,
  toNormalizedPath,
  toSlug,
  toHref
}: MetadataMakerOptions): PostMetadata => {
  const normalizedPath = strip(toNormalizedPath(path, metadata))
  const slug = strip(toSlug(normalizedPath, metadata))
  const pathArray = strip(slug).split('/')
  const levels = pathArray.length
  const _date = dayjs(metadata.date ?? getFileTime())
  const root = levels === 1 ? '' : pathArray[0]
  const _href = toHref(slug, normalizedPath, metadata)
  const href = base ? `${base}${_href}` : _href
  const inMenu = metadata.inMenu ?? (metadata.menuTitle !== null && metadata.menuTitle !== '')
  const title = metadata.title ?? slug.replace(/-|_/g, ' ')
  return {
    slug,
    levels,
    root,
    href,
    published: Boolean(metadata.published ?? true),
    date_unix: _date.unix(),
    date: _date.format(`YYYY-MM-DDTHH`),
    order: metadata.order ?? 0,
    title,
    menuTitle: metadata.menuTitle ?? title,
    inMenu,
    description: metadata.description ?? '',
    author: metadata.author ?? '',
    path: normalizedPath,
    pathParts: _href.replace(/^\/|\/$/g, '').split('/'),
    children: [] as PostMetadata[]
  }
}
