import { StatusCodes } from 'http-status-codes'
import type { RequestHandler } from '@sveltejs/kit'
import env from '$config/env.server'
import cookie from 'cookie'
import { base } from '$app/paths'

const { github_client_id, github_client_secret } = env

const helpers = {
  async loadAccessToken(code: string) {
    const body = JSON.stringify({
      client_id: github_client_id,
      client_secret: github_client_secret,
      code
    })

    const tokenURL = 'https://github.com/login/oauth/access_token'
    const response = await fetch(tokenURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body
    })

    const json = await response.json()
    const access_token: string = json.access_token

    return access_token
  },

  async loadUserFromAccessToken(accessToken: string) {
    const userURL = 'https://api.github.com/user'
    const response = await fetch(userURL, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
    const user: GithubProfile = await response.json()
    return user
  }
}

const login: RequestHandler = async (event) => {
  const authURL = 'https://github.com/login/oauth/authorize'
  const goto = event.url.searchParams.get('url')
  const key = '1234'
  const stateParams: OAuthStateParams = { goto, key }
  const state = JSON.stringify(stateParams)
  const query = new URLSearchParams({ client_id: github_client_id, state }).toString()
  return {
    status: StatusCodes.MOVED_TEMPORARILY,
    headers: {
      location: `${authURL}?${query}`
    }
  }
}

const logout: RequestHandler = async (event) => {
  event.locals.user = ''

  const goto = event.url.searchParams.get('url')
  const query = goto ? '?' + new URLSearchParams({ goto }).toString() : ''
  return {
    status: StatusCodes.MOVED_TEMPORARILY,
    headers: {
      'set-cookie': cookie.serialize('user', 'deleted', {
        path: '/',
        expires: new Date(null),
        httpOnly: true,
        maxAge: -1
      }),
      location: `/${query}`
    }
  }
}

const callback: RequestHandler = async (event) => {
  const code = event.url.searchParams.get('code')
  const { key, goto }: OAuthStateParams = JSON.parse(
    event.url.searchParams.get('state') || JSON.stringify({ goto: '', key: '' })
  )

  console.log('callback', { key, goto })
  // TODO: switch this to a secure state
  if (key !== '1234') {
    return {
      status: StatusCodes.FORBIDDEN,
      headers: {
        location: '/'
      }
    }
  }
  const accessToken = await helpers.loadAccessToken(code)
  const user = await helpers.loadUserFromAccessToken(accessToken)

  // this mutates the locals object on the request
  // and will be read by the hooks/handle function
  // after the resolve
  event.locals.user = user?.login || null

  const path = goto ? goto : `profile/@${user.login}`
  const location = `${base}${path}`
  console.log('callback', { path, location, locals: event.locals })
  return {
    status: StatusCodes.MOVED_TEMPORARILY,
    headers: {
      'set-cookie': cookie.serialize('user', event.locals.user, {
        path: '/',
        httpOnly: true
      }),
      location
    }
  }
}

const endpoints = { login, logout, callback }

export const get: RequestHandler = async (event) => {
  const slug = event.params.slug
  console.log({ slug })
  if (slug in endpoints) {
    return endpoints[slug](event)
  }
  return {
    status: StatusCodes.NOT_FOUND
  }
}
