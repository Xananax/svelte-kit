import type { RequestHandler } from '@sveltejs/kit'
import dayjs from 'dayjs'
import { basename, dirname } from 'path'

const slugFromPath = (path: string) => basename(dirname(path))
interface SvelteModule {
  default: {
    render: () => unknown
    $$render: () => unknown
  }
  metadata: ModulePostMetadata
}

type Modules = Array<[string, () => Promise<SvelteModule>]>

const modules = Object.entries(import.meta.glob(`./*/index.{md,svx,svelte.md}`)) as Modules

const loadPostMetadata = async (path: string, resolver: () => Promise<SvelteModule>) => {
  const slug = slugFromPath(path)
  const post = await resolver()
  const metadata = post.metadata
  const published = Boolean(metadata.published ?? true)
  const _date = dayjs(metadata.date ?? new Date())
  const date_unix = _date.unix()
  const date = _date.format(`YYYY-MM-DDTHH`)
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
    date_unix
  }
  return data
}

export const getOne = async (slug: string) => {
  const match = modules.find(([path]) => slugFromPath(path) === slug)

  if (!match) {
    return null
  }

  const post = await loadPostMetadata(...match)
  return post
}

export async function getMany(limit: number) {
  const posts = (
    await Promise.all(modules.map(([path, resolver]) => loadPostMetadata(path, resolver)))
  )
    .filter(({ published }) => published)
    .sort(({ date_unix: a }, { date_unix: b }) => a - b)
    .slice(0, limit)

  return posts
}

export const get: RequestHandler = async ({ params, query }) => {
  const limit = Number(query.get('limit') ?? Infinity)

  if (Number.isNaN(limit)) {
    return {
      status: 400
    }
  }

  const { slug } = params

  const result = await (slug === 'all' ? getMany(limit) : getOne(slug))

  if (!result) {
    return {
      status: 404
    }
  }

  const body = JSON.stringify(result)
  return { body }
}
