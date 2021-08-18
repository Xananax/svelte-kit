import { dirname, basename } from '$lib/path'

export const unprocessedPages = import.meta.globEager('../../posts/**/*.{md,svx,svelte.md}')
export const normalizePagePath = (path: string) => path.replace(/^(\.\.\/)+posts/, '')
export const pagePathToSlug = (path: string) =>
  path.replace(/(\/index)?\.(md|svx|svelte\.md)$/, '').replace(/\/chapters\//, '/')
export const filename = import.meta.url

const root = basename(dirname(dirname(import.meta.url)))
const rootRegex = new RegExp(`^\\/${root}`)
export const toAPIPath = (path: string) => path.replace(rootRegex, `/${root}/api`)
export const toHref = (slug: string) => `/${root}/${slug}`
