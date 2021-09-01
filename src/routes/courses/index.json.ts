import type { RequestHandler } from '@sveltejs/kit'
import { makeMetadata } from '$lib/makeMetadata'
import { base } from '$app/paths'
import { dayjs } from '$lib/dayjs'
import { strip } from '$lib/path'

const unprocessedPages = import.meta.globEager('./**/index.{md,svx,svelte.md}')
const toNormalizedPath = (path: string) => path.replace(/^(\.\/)/, '')
const pagePathToSlug = (path: string) => path.replace(/(\/index)?\.(md|svx|svelte\.md)$/, '')

export const toAPIPath = (path: string) => `/${strip(path)}.json`
export const toHref = (slug: string) => `/courses/${slug}`

const toSlug = (normalizedPath: string, metadata: PostMetadata) =>
  metadata.slug ?? pagePathToSlug(normalizedPath)

export const { children, pages, modules } = (() => {
  const children = {} as Record<string, PostMetadata[]>
  const modules = {} as Record<string, SvelteModule['default']>
  const pages = Object.entries(unprocessedPages).reduce(
    (obj, [path, { metadata, default: module }]) => {
      if (!metadata) {
        throw new Error('NO METADATA IN ' + path)
      }
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

/**
 * This is a _client_ method which re-augments the date with a DayJS object, after
 * receiving the date as a string. It is _not_ to be used server-side, since DayJS
 * cannot be serialized as JSON
 * @param metadata A post
 * @returns An augmented post
 */
export const augmentMetadata = (metadata: PostMetadata): PostMetadataAugmented => {
  const { date, slug, children } = metadata
  const href = `${base}${toHref(slug)}`
  return {
    ...metadata,
    href,
    date: dayjs(date),
    children: children.map(augmentMetadata)
  }
}
