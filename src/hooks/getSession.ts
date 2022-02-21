import type { GetSession } from '@sveltejs/kit'

export const getSession: GetSession = (event) => {
  return {
    user: event.locals.user
  }
}
