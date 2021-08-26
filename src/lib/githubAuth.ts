import type { RequestHandler } from '@sveltejs/kit'
import { github_client_id, github_client_secret } from '$lib/serverEnv'

const authURL = 'https://github.com/login/oauth/authorize'

export const redirectToGithub: RequestHandler = async (_req) => {
  const sessionId = '1234'
  return {
    status: 302,
    headers: {
      location: `${authURL}?client_id=${github_client_id}&state=${sessionId}`
    }
  }
}

export const logout: RequestHandler = async (req) => {
  req.locals.user = ''
  return {
    status: 302,
    headers: {
      'set-cookie': 'user=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
      location: '/'
    }
  }
}

const tokenURL = 'https://github.com/login/oauth/access_token'
const userURL = 'https://api.github.com/user'

export const loadUser: RequestHandler = async (req) => {
  const code = req.query.get('code')
  const accessToken = await getAccessToken(code)
  const user = await getUser(accessToken)

  // this mutates the locals object on the request
  // and will be read by the hooks/handle function
  // after the resolve
  req.locals.user = user?.login || null

  return {
    status: 302,
    headers: {
      location: '/'
    }
  }
}

const getAccessToken = async (code: string) => {
  const body = JSON.stringify({
    client_id: github_client_id,
    client_secret: github_client_secret,
    code
  })

  const response = await fetch(tokenURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body
  })

  const json = await response.json()
  const access_token: string = json.access_token

  return access_token
}

export const getUser = async (accessToken: string) => {
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
  created_at: string //'2011-06-07T21:03:31Z',
  updated_at: string //'2021-08-24T11:39:24Z'
}
