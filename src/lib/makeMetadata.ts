import { dayjs } from '$lib/dayjs'

const strip = (path: string) => path.replace(/^\/+|\/+$/g, '')
const defaultGetFileTime = () => Date.now()

export type MetadataMakerOptions = {
  path: string
  metadata: SvelteModule['metadata']
  toNormalizedPath: (path: string, metadata: SvelteModule['metadata']) => string
  toSlug: (normalizedPath: string, metadata: SvelteModule['metadata']) => string
  getFileTime?: (normalizedPath: string, metadata: SvelteModule['metadata']) => number
}

export const makeMetadata = ({
  path,
  metadata,
  toNormalizedPath,
  toSlug,
  getFileTime = defaultGetFileTime
}: MetadataMakerOptions) => {
  const normalizedPath = strip(toNormalizedPath(path, metadata))
  const slug = strip(toSlug(normalizedPath, metadata))
  const pathArray = strip(slug).split('/')
  const levels = pathArray.length
  const _date = dayjs(metadata.date ?? getFileTime(normalizedPath, metadata))
  const root = levels === 1 ? '' : pathArray[0]
  return {
    slug,
    levels,
    root,
    published: Boolean(metadata.published ?? true),
    date_unix: _date.unix(),
    date: _date.format(`YYYY-MM-DDTHH`),
    order: metadata.order ?? 0,
    title: metadata.title ?? slug.replace(/-|_/g, ' '),
    description: metadata.description ?? '',
    author: metadata.author ?? '',
    path: normalizedPath,
    children: [] as PostMetadata[]
  }
}
