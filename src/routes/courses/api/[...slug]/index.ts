import type { RequestHandler } from '@sveltejs/kit'
import { unprocessedPages, filename, normalizePagePath, pagePathToSlug } from '../_consts'
import { getFileTimeSync } from '$lib/getFileTime'
import { dayjs } from '$lib/dayjs'

const strip = (path: string) => path.replace(/^\/+|\/+$/g, '')

const children = {} as Record<PostMetadata['slug'], PostMetadata[]>

const pages = Object.entries(unprocessedPages).reduce((obj, [path, resolver]) => {
  const normalizedPath = strip(normalizePagePath(path))
  const defaultSlug = strip(pagePathToSlug(normalizedPath))
  const { metadata } = resolver
  const slug = metadata.slug ?? defaultSlug
  const pathArray = strip(slug).split('/')
  const levels = pathArray.length
  const _date = dayjs(metadata.date ?? getFileTimeSync(filename)(path))
  const root = levels === 1 ? '' : pathArray[0]
  const data = {
    slug,
    levels,
    root,
    published: Boolean(metadata.published ?? true),
    date_unix: _date.unix(),
    date: _date.format(`YYYY-MM-DDTHH`),
    order: metadata.order ?? 0,
    title: metadata.title ?? slug.replace(/-|_/g, ' '),
    description: metadata.description ?? '',
    author: metadata.author ?? '',
    path: normalizedPath,
    children: []
  }
  obj[slug] = data
  ;(children[root] = children[root] || []).push(data)
  return obj
}, {} as Record<PostMetadata['slug'], PostMetadata>)

Object.entries(children).forEach(([slug, children]) => slug && (pages[slug].children = children))

type ResponseList = {
  isList: true
  data: PostMetadata[]
}

type ResponseOne = {
  isList: false
  data: PostMetadata
}

export type Response = ResponseList | ResponseOne

export const get: RequestHandler = async ({ params: { slug }, query }) => {
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
