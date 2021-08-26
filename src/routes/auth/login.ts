import type { RequestHandler } from '@sveltejs/kit'

const ghAuthURL = 'https://github.com/login/oauth/authorize'
const clientId = import.meta.env.VITE_GITHUB_OAUTH_CLIENT_ID

export const get: RequestHandler = async (_req) => {
  const sessionId = '1234'
  return {
    status: 302,
    headers: {
      location: `${ghAuthURL}?client_id=${clientId}&state=${sessionId}`
    }
  }
}
