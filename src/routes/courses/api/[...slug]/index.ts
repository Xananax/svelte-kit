import type { RequestHandler } from '@sveltejs/kit'
import { loadPages, toFilename } from '../_consts'
import { getFileTimeSync } from '$lib/getFileTime'

const getFileTime = (path: string) => getFileTimeSync(toFilename(path))

const { pages, children } = loadPages(getFileTime)

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
