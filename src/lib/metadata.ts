import { dayjs } from './dayjs'
import { strip } from './path'

const defNormalizers = {
  getFileTime: (_metadata: SvelteModule['metadata']) => Date.now(),
  toNormalizedPath: (path: string, _metadata: SvelteModule['metadata']) => path,
  toSlug: (strippedPath: string, _metadata: SvelteModule['metadata']) =>
    strippedPath.replace(/(\/index)?\.(md|svx|svelte\.md)$/, ''),
  toHref: (slug: string, _strippedPath: string, _metadata: SvelteModule['metadata']) => `${slug}`
}

type MetadataNormalizers = typeof defNormalizers

type MetadataMakerOptions = {
  requestPath: string
  metadata: SvelteModule['metadata']
} & Partial<MetadataNormalizers>

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
export const normalizeMetadata = ({
  requestPath,
  metadata,
  toNormalizedPath = defNormalizers.toNormalizedPath,
  toSlug = defNormalizers.toSlug,
  toHref = defNormalizers.toHref,
  getFileTime = defNormalizers.getFileTime
}: MetadataMakerOptions) => {
  const path = strip(toNormalizedPath(metadata.path ?? requestPath, metadata))
  const slug = metadata.slug ?? toSlug(strip(path), metadata)
  const pathArray = strip(slug).split('/')
  const levels = pathArray.length
  const _date = dayjs(metadata.date ?? getFileTime(metadata))
  const root = levels === 1 ? '' : pathArray[0]
  const href = toHref(slug, path, metadata)
  const inMenu = metadata.inMenu ?? (metadata.menuTitle !== null && metadata.menuTitle !== '')
  const title = metadata.title ?? slug.replace(/-|_/g, ' ')
  const price = metadata.price ?? 0
  const pathParts = href.replace(/^\/|\/$/g, '').split('/')
  const isCourse = levels == 1
  const isChapter = levels > 1
  const date = _date.format(`YYYY-MM-DDTHH`)
  const stripe_id: PostMetadata['stripe_id'] = `prod_${slug}-${date}`
  const meta: PostMetadata = {
    stripe_id,
    slug,
    levels,
    root,
    href,
    published: Boolean(metadata.published ?? true),
    date_unix: _date.unix(),
    date,
    order: metadata.order ?? 0,
    title,
    menuTitle: metadata.menuTitle ?? title,
    inMenu,
    description: metadata.description ?? '',
    author: metadata.author ?? '',
    path,
    pathParts,
    children: [] as PostMetadata[],
    price,
    isCourse,
    isChapter
  }
  return meta
}

/**
 * This is a _client_ method which re-augments the date with a DayJS object, after
 * receiving the date as a string. It is _not_ to be used server-side, since DayJS
 * cannot be serialized as JSON
 * @param metadata A post
 * @returns An augmented post
 */
export const augmentMetadata = (metadata: PostMetadata): PostMetadataAugmented => {
  const { date, children } = metadata
  return {
    ...metadata,
    date: dayjs(date),
    children: children.map(augmentMetadata)
  }
}

/**
 * This is a _client_ method which re-augments the date with a DayJS object, after
 * receiving the date as a string. It is _not_ to be used server-side, since DayJS
 * cannot be serialized as JSON
 * @param metadata A page
 * @returns An augmented page
 */
export const augmentPage = (page: PageMetadata): PageMetadataAugmented => ({
  ...page,
  date: dayjs(page.date)
})

export const extractMetadataFromModules = (
  unprocessedPages: [string, SvelteModule][],
  options: Partial<MetadataNormalizers> = {}
) => {
  const children = {} as Record<string, PostMetadata[]>

  const pages = unprocessedPages.reduce((_pages, [requestPath, { metadata, default: module }]) => {
    if (!metadata) {
      throw new Error('NO METADATA IN ' + requestPath)
    }
    const normalizedMetadata = normalizeMetadata({ requestPath, metadata, ...options })
    const { slug, root } = normalizedMetadata
    _pages[slug] = normalizedMetadata
    ;(children[root] = children[root] || []).push(normalizedMetadata)
    return _pages
  }, {} as Record<PostMetadata['slug'], PostMetadata>)

  Object.entries(children).forEach(([slug, children]) => slug && (pages[slug].children = children))

  return { children, pages }
}

export const unpackClientModules = (unprocessedPages: [string, () => Promise<SvelteModule>][]) =>
  Promise.all(
    unprocessedPages.map(async ([path, resolver]) => {
      const module = await resolver()
      return [path, module] as [string, SvelteModule]
    })
  )

export const reducePagesToRef = ({
  pages
}: Awaited<ReturnType<typeof extractMetadataFromModules>>) =>
  Object.values(pages)
    .map(({ slug, title }) => ({
      slug,
      title
    }))
    .filter(Boolean)
    .reduce((obj, { slug, title }) => {
      obj[slug] = title
      return obj
    }, {} as Record<string, string>)
