import type { RequestHandler } from '@sveltejs/kit'
import { loadPostMetadata } from '$lib/loadPostMetadata'
import { getFileTime } from '$lib/getFileTime'
import { basename, dirname } from 'path'
import { makeModuleLoader } from '$lib/makeModuleLoader'

export const slugFromPath = (path: string) => basename(dirname(path))
const load = loadPostMetadata(slugFromPath, getFileTime(import.meta.url))
const getModules = makeModuleLoader(import.meta.glob(`./*/index.{md,svx,svelte.md}`), load)

export const getOne = async (slug: string) => {
  const post = (await getModules()).list.find(({ path }) => slugFromPath(path) === slug)

  if (!post) {
    return null
  }

  return post
}

export async function getMany(limit: number) {
  const posts = (await getModules()).list
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
