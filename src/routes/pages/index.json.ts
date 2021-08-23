import type { RequestHandler } from '@sveltejs/kit'
import { basename, extname, join } from 'path'
import { dayjs } from '$lib/dayjs'
import { makeMetadata } from '$lib/makeMetadata'

//const dir = typeof __dirname !== 'undefined' ? __dirname : dirname(import.meta.url)
const dir = 'src/routes/pages'

const toSlug = (path: string) => basename(path, extname(path))
const toNormalizedPath = (path: string) => path.replace(/^(\.\/)/, '')
const toFilename = (path: string) => join(dir, path)

const unprocessedPages = import.meta.globEager('./*.{md,svx,svelte,svelte.md}')

const list = Object.entries(unprocessedPages)
  .map(([path, { metadata }]) =>
    makeMetadata({ path, metadata: metadata ?? {}, toSlug, toNormalizedPath })
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