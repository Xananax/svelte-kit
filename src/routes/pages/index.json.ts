import type { RequestHandler } from '@sveltejs/kit'
import { base } from '$app/paths'
import { basename, extname } from 'path'
import { dayjs } from '$lib/dayjs'
import { makeMetadata } from '$lib/metadataHelpers'

const toSlug = (path: string) => basename(path, extname(path))
const toNormalizedPath = (path: string) => path.replace(/^(\.\/)/, '')
const toHref = (slug: string) => `/pages/${slug}`

const unprocessedPages = import.meta.globEager('./*.{md,svx,svelte,svelte.md}')

const list = Object.entries(unprocessedPages)
  .map(([path, { metadata }]) =>
    makeMetadata({ path, metadata: metadata ?? {}, toSlug, toNormalizedPath, toHref })
  )
  .sort(({ order: a }, { order: b }) => a - b)

const now = dayjs(Date.now())
const date = now.format(`YYYY-MM-DDTHH`)
const date_unix = now.unix()

const pages = [
  { title: 'Home', pathParts: [''], href: `${base}/`, slug: '', date, date_unix },
  ...list,
  {
    title: 'Courses',
    pathParts: ['courses'],
    href: `${base}/courses`,
    slug: 'courses',
    date,
    date_unix
  }
] as PageMetadata[]

export const get: RequestHandler = () => {
  return {
    body: JSON.stringify(pages)
  }
}
