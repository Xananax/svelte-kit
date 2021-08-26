import type { RequestHandler } from '@sveltejs/kit'
import { github_client_id, github_client_secret } from '$lib/serverEnv'

const tokenURL = 'https://github.com/login/oauth/access_token'
const userURL = 'https://api.github.com/user'

export const get: RequestHandler = async (req) => {
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

function getAccessToken(code) {
  return fetch(tokenURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      client_id: github_client_id,
      client_secret: github_client_secret,
      code
    })
  })
    .then((r) => r.json())
    .then((r) => r.access_token)
}

function getUser(accessToken) {
  return fetch(userURL, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  }).then((r) => r.json())
}
