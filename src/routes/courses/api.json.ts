import type { RequestHandler } from '@sveltejs/kit'
import { StatusCodes } from 'http-status-codes'
import { extractMetadataFromModules } from '$lib/metadata'

const unprocessedPages = Object.entries(import.meta.globEager('./**/index.{md,svx,svelte.md}'))
export const { children, pages } = extractMetadataFromModules(unprocessedPages, {
  toHref: (slug: string) => `/courses/${slug}`,
  toNormalizedPath: (path: string) => path.replace(/^\.+\/+/, '')
})

export type RestrictedPostData = Pick<PostMetadata, 'title' | 'description' | 'slug'>

export type MetadataResponse = {
  isList: boolean
  data: PostMetadata[]
}

export const get: RequestHandler = async (event) => {
  event.params.slug = ''
  return getChildren(event)
}

export const getChildren: RequestHandler = async ({ params: { slug }, url, locals: { user } }) => {
  const hasData = slug in children

  if (!hasData) {
    return { status: StatusCodes.NOT_FOUND }
  }

  const list = children[slug]
  // TODO: Strip data from paid courses
  const response: MetadataResponse = { isList: true, data: list }

  return {
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(response)
  }
}

export const getOne: RequestHandler = async ({ params: { slug }, url, locals: { user } }) => {
  const hasData = slug in pages
  if (!hasData) {
    return { status: StatusCodes.NOT_FOUND }
  }

  const page = pages[slug]
  if (page.price > 0 && !user) {
    // TODO: replace this with checking that user has access to the resource
    return {
      error: 'you are not allowed to access this resource without logging in',
      status: StatusCodes.UNAUTHORIZED
    }
  }

  const response: MetadataResponse = { isList: false, data: [page] }

  return {
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(response)
  }
}
