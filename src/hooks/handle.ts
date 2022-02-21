import cookie from 'cookie'
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
  const cookies = cookie.parse(event.request.headers.get('cookie') || '')
  event.locals.user = cookies.user || ''

  const response = await resolve(event)

  response.headers.set(
    'set-cookie',
    cookie.serialize('user', event.locals.user, {
      path: '/',
      httpOnly: true
    })
  )

  return response
}
