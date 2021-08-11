import type { RequestHandler } from '@sveltejs/kit'
import { loadPostMetadata } from '$lib/loadPostMetadata'
import { basename, dirname } from 'path'

export const slugFromPath = (path: string) => basename(dirname(path))

const load = loadPostMetadata(import.meta.url, slugFromPath)

const modules = Object.entries(
  import.meta.glob(`./*/index.{md,svx,svelte.md}`) as ImportMetaModules
)

export const getOne = async (slug: string) => {
  const match = modules.find(([path]) => slugFromPath(path) === slug)

  if (!match) {
    return null
  }

  const post = await load(...match)
  return post
}

export async function getMany(limit: number) {
  const posts = (await Promise.all(modules.map((pair) => load(...pair))))
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
