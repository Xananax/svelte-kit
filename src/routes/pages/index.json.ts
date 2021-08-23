import type { RequestHandler } from '@sveltejs/kit'
import { basename, extname } from 'path'
import { base } from '$app/paths'
import { dayjs } from '$lib/dayjs'
import { makeMetadata } from '$lib/makeMetadata'

const toSlug = (path: string) => basename(path, extname(path))
const toNormalizedPath = (path: string) => path.replace(/^(\.\/)/, '')

const unprocessedPages = import.meta.globEager('./*.{md,svx,svelte,svelte.md}')

const list = Object.entries(unprocessedPages)
  .map(([path, { metadata }]) =>
    makeMetadata({ path, metadata: metadata ?? {}, toSlug, toNormalizedPath })
  )
  .map((post) => ({ ...post, href: `${base}/pages/${post.slug}` }))
  .sort(({ order: a }, { order: b }) => a - b)

const now = dayjs(Date.now())
const date = now.format(`YYYY-MM-DDTHH`)
const date_unix = now.unix()

const pages = [
  { title: 'Home', href: `${base}/`, slug: '', date, date_unix },
  ...list,
  { title: 'Courses', href: `${base}/courses`, slug: 'courses', date, date_unix }
] as PageMetadata[]

export const get: RequestHandler = () => {
  return { body: JSON.stringify(pages) }
}
