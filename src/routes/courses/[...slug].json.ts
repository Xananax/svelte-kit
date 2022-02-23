import type { RequestHandler } from '@sveltejs/kit'
import { getOne, getChildren } from './api.json'

export const get: RequestHandler = async (event) => {
  const isList = event.url.searchParams.has('list') || event.params.slug === ''
  return isList ? getChildren(event) : getOne(event)
}
