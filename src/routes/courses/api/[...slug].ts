import type { RequestHandler } from '@sveltejs/kit'
import { StatusCodes } from 'http-status-codes'
import { extractMetadataFromModules } from '$lib/metadata'

const unprocessedPages = Object.entries(import.meta.globEager('../**/index.{md,svx,svelte.md}'))
export const { children, pages } = extractMetadataFromModules(unprocessedPages, {
  toHref: (slug: string) => `/courses/${slug}`,
  toNormalizedPath: (path: string) => path.replace(/^\.+\/+/, '')
})

export type MetadataResponse = {
  isList: boolean
  data: PostMetadata[]
}

export const get: RequestHandler = async ({ params: { slug }, url, locals: { user } }) => {
  const isList = url.searchParams.has('list') || slug === ''
  const hasData = isList ? slug in children : slug in pages

  if (!hasData) {
    return { status: StatusCodes.NOT_FOUND }
  }

  let response: MetadataResponse

  if (isList) {
    const list = children[slug]
    response = { isList, data: list }
  } else {
    const page = pages[slug]
    if (page.price > 0 && !user) {
      // TODO: replace this with checking that user has access to the resource
      return {
        error: 'you are not allowed to access this resource without logging in',
        status: StatusCodes.UNAUTHORIZED
      }
    }
    response = { isList, data: [page] }
  }
  return { body: JSON.stringify(response) }
}
