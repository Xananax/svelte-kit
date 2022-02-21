import type { RequestHandler } from '@sveltejs/kit'
import { base } from '$app/paths'
import { basename, extname } from 'path'
import { dayjs } from '$lib/dayjs'
import { normalizeMetadata } from '$lib/metadata'

const unprocessedPages = Object.entries(import.meta.globEager('./*.{md,svx,svelte,svelte.md}'))

const options = {
  toSlug: (path: string) => basename(path, extname(path)),
  toHref: (slug: string) => `/pages/${slug}`
}

const list = unprocessedPages.map(([requestPath, { metadata = {} }]) =>
  normalizeMetadata({ requestPath, metadata, ...options })
)

const now = dayjs(Date.now())
const date = now.format(`YYYY-MM-DDTHH`)
const date_unix = now.unix()

const pages = [
  {
    title: 'Home',
    menuTitle: 'Home',
    pathParts: [''],
    href: `${base}/`,
    slug: '',
    date,
    date_unix
  },
  ...list.filter(({ inMenu }) => inMenu),
  {
    title: 'Courses',
    menuTitle: 'Courses',
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
