import dayjs from 'dayjs'
import { join, dirname } from 'path'
import { promises as fsPromises } from 'fs'
const { stat } = fsPromises

export const loadPostMetadata = (root: string, slugFromPath: (path: string) => string) => async (
  path: string,
  resolver: () => Promise<SvelteModule>
) => {
  const filename = join(dirname(root), path)
  const slug = slugFromPath(path)
  const post = await resolver()
  const metadata = post.metadata ?? {}
  const published = Boolean(metadata.published ?? true)
  const _date = dayjs(metadata.date ?? (await stat(filename)).mtime)
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
    date_unix
  }
  return data
}
