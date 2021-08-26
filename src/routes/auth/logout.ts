import type { RequestHandler } from '@sveltejs/kit'

export const get: RequestHandler = async (req) => {
  req.locals.user = null

  return {
    status: 302,
    headers: {
      location: '/'
    }
  }
}
