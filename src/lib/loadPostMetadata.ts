import dayjs from 'dayjs'
import { strip } from '$lib/path'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const defaultGetFileTime = async (_filename: string) => Date.now()

export const loadPostMetadata = (
  slugFromPath: (path: string) => string,
  getFileTime = defaultGetFileTime
) => async (path: string, resolver: () => Promise<SvelteModule>) => {
  const slug = slugFromPath(path)
  const pathArray = strip(slug).split('/')
  const levels = pathArray.length
  const root = levels === 1 ? '' : pathArray[0]
  const post = await resolver()
  const metadata = post.metadata ?? {}
  const published = Boolean(metadata.published ?? true)
  const _date = dayjs(metadata.date ?? (await getFileTime(path)))
  const date_unix = _date.unix()
  const date = _date.format(`YYYY-MM-DDTHH`)
  const order = metadata.order ?? 0
  const title = metadata.title ?? slug.replace(/-|_/g, ' ')
  const description = metadata.description ?? ''
  const author = metadata.author ?? ''
  const data: PostMetadata = {
    ...metadata,
    slug,
    title,
    published,
    description,
    author,
    date,
    order,
    date_unix,
    path,
    levels,
    root
  }
  return data
}
