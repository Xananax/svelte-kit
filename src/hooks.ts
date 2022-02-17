import cookie from 'cookie'
//import { v4 as uuid } from '@lukeed/uuid'
import type { Handle, GetSession } from '@sveltejs/kit'
import '$lib/config/serverEnv' // we import this to get the errors thrown as soon as we run if variables are missing

export const handle: Handle = async ({ event, resolve }) => {
  const cookies = cookie.parse(event.request.headers.get('cookie') || '')

  console.log({ cookies })

  event.locals.user = cookies.user || ''

  const response = await resolve(event)

  response.headers.set('set-cookie', `user=${event.locals.user}; Path=/; SameSite=strict; HttpOnly`)

  return response
}

export const getSession: GetSession = (event) => {
  console.log('sesh', event.locals)
  return {
    user: event.locals.user
  }
}
