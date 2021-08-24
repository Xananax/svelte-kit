import type { RequestHandler } from '@sveltejs/kit'
import { makeMetadata } from '$lib/makeMetadata'

const unprocessedPages = import.meta.globEager('./**/index.{md,svx,svelte.md}')
const toNormalizedPath = (path: string) => path.replace(/^(\.\/)/, '')
const pagePathToSlug = (path: string) => path.replace(/(\/index)?\.(md|svx|svelte\.md)$/, '')

export const toAPIPath = (path: string) => `${path}.json`
export const toHref = (slug: string) => `/courses/${slug}`

const toSlug = (normalizedPath: string, metadata: PostMetadata) =>
  metadata.slug ?? pagePathToSlug(normalizedPath)

export const { children, pages, modules } = (() => {
  const children = {} as Record<string, PostMetadata[]>
  const modules = {} as Record<string, SvelteModule['default']>
  const pages = Object.entries(unprocessedPages).reduce(
    (obj, [path, { metadata, default: module }]) => {
      const data = makeMetadata({ path, metadata, toSlug, toNormalizedPath, toHref })
      const { slug, root } = data
      obj[slug] = data
      modules[slug] = module
      ;(children[root] = children[root] || []).push(data)
      return obj
    },
    {} as Record<string, PostMetadata>
  )

  Object.entries(children).forEach(([slug, children]) => slug && (pages[slug].children = children))

  return { children, pages, modules }
})()

type ResponseList = {
  isList: true
  data: PostMetadata[]
}

type ResponseOne = {
  isList: false
  data: PostMetadata
}

export type Response = ResponseList | ResponseOne

export const get: RequestHandler = async ({ params: { course, chapter }, query }) => {
  course = course ?? ''
  chapter = chapter ?? ''
  const slug = chapter ? course + '/' + chapter : course
  const isList = query.has('list') || slug === ''
  const data = isList ? children[slug] : pages[slug]
  if (!data) {
    return { status: 404 }
  }
  const response = {
    isList,
    data
  } as Response
  return { body: JSON.stringify(response) }
}

type Fetch = (info: RequestInfo, init?: RequestInit) => Promise<globalThis.Response>

export const loadPageMetadata = async (path: string, fetch: Fetch) => {
  const apiPath = toAPIPath(path)
  const response: Response = await (await fetch(apiPath)).json()
  return response
}
