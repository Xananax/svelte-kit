import type { RequestHandler } from '@sveltejs/kit'
import { basename, extname, join, dirname } from 'path'
import { dayjs } from '$lib/dayjs'
import { makeMetadata } from '$lib/makeMetadata'
import { getFileTimeSync } from '$lib/getFileTime'

const toSlug = (path: string) => basename(path, extname(path))
const toNormalizedPath = (path: string) => path.replace(/^(\.\/)/, '')
const toFilename = (path: string) => join(dirname(import.meta.url), path)
const getFileTime = (path: string) => getFileTimeSync(toFilename(path))

const unprocessedPages = import.meta.globEager('./*.{md,svx,svelte,svelte.md}')

const list = Object.entries(unprocessedPages)
  .map(([path, { metadata }]) =>
    makeMetadata({ path, metadata: metadata ?? {}, toSlug, toNormalizedPath, getFileTime })
  )
  .sort(({ order: a }, { order: b }) => a - b)

const now = dayjs(Date.now())
const date = now.format(`YYYY-MM-DDTHH`)
const date_unix = now.unix()

const pages = [
  { title: 'Home', href: '/', slug: '', date, date_unix },
  ...list,
  { title: 'Courses', href: '/courses', slug: 'courses', date, date_unix }
] as PageMetadata[]

export const get: RequestHandler = () => {
  return { body: JSON.stringify(pages) }
}
