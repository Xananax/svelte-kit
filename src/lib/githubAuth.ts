import type { RequestHandler } from '@sveltejs/kit'
import env from '$lib/config/serverEnv'
import { base } from '$app/paths'

const { github_client_id, github_client_secret } = env

type OAuthStateParams = { goto: string; key: string }

export const login: RequestHandler = async (req) => {
  const authURL = 'https://github.com/login/oauth/authorize'
  const goto = req.query.get('url')
  const key = '1234'
  const stateParams: OAuthStateParams = { goto, key }
  const state = JSON.stringify(stateParams)
  const query = new URLSearchParams({ client_id: github_client_id, state }).toString()
  return {
    status: 302,
    headers: {
      location: `${authURL}?${query}`
    }
  }
}

export const logout: RequestHandler = async (req) => {
  req.locals.user = ''

  const goto = req.query.get('url')
  const query = goto ? '?' + new URLSearchParams({ goto }).toString() : ''

  return {
    status: 302,
    headers: {
      'set-cookie': 'user=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
      location: `/${query}`
    }
  }
}

export const githubCallback: RequestHandler = async (req) => {
  const code = req.query.get('code')
  const { key, goto }: OAuthStateParams = JSON.parse(
    req.query.get('state') || JSON.stringify({ goto: '', key: '' } as OAuthStateParams)
  )
  // TODO: switch this to a secure state
  if (key !== '1234') {
    return {
      status: 403,
      headers: {
        location: '/'
      }
    }
  }
  const accessToken = await loadAccessToken(code)
  const user = await loadUserFromAccessToken(accessToken)

  // this mutates the locals object on the request
  // and will be read by the hooks/handle function
  // after the resolve
  req.locals.user = user?.login || null

  const path = goto ? goto : `profile/@${user.login}`
  const location = `${base}${path}`
  return {
    status: 302,
    headers: {
      location
    }
  }
}

/******************************************************************************
 *  GITHUB API HANDLERS BELOW
 *****************************************************************************/

const loadAccessToken = async (code: string) => {
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
  console.log(json)
  const access_token: string = json.access_token

  return access_token
}

export const loadUserFromAccessToken = async (accessToken: string) => {
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

type GithubProfile = {
  login: string
  id: number
  node_id: string
  avatar_url: string //https://avatars.githubusercontent.com/u/<id>
  gravatar_id: string
  url: string // https://api.github.com/users/<user_id>
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: 'User'
  site_admin: boolean
  name: string
  company: unknown
  blog: ''
  location: unknown
  email: string
  hireable: unknown
  bio: unknown
  twitter_username: unknown
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: DateYMDHhMmSs //'2011-06-07T21:03:31Z',
  updated_at: DateYMDHhMmSs //'2021-08-24T11:39:24Z'
}
