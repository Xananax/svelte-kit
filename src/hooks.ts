import cookie from 'cookie'
//import { v4 as uuid } from '@lukeed/uuid'
import type { Handle, GetSession } from '@sveltejs/kit'
import '$lib/config/serverEnv' // we import this to get the errors thrown as soon as we run if variables are missing

export const handle: Handle = async ({ request, resolve }) => {
  const cookies = cookie.parse(request.headers.cookie || '')
  //request.locals.userid = cookies.userid || uuid()

  request.locals.user = cookies.user || ''

  // TODO https://github.com/sveltejs/kit/issues/1046
  if (request.query.has('_method')) {
    request.method = request.query.get('_method').toUpperCase()
  }

  const response = await resolve(request)

  response.headers['set-cookie'] = `user=${request.locals.user}; Path=/; HttpOnly`

  return response
}

export const getSession: GetSession = (request) => {
  return {
    user: request.locals.user
  }
}
