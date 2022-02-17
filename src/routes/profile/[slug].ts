import type { RequestHandler } from '@sveltejs/kit'
import { login, logout, githubCallback as callback } from '$lib/githubAuth'

const endpoints = { login, logout, callback }

export const get: RequestHandler = async (event) => {
  const slug = event.params.slug
  if (slug in endpoints) {
    return endpoints[slug](event)
  }
  return {
    status: 404
  }
}
