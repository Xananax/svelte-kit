import { browser, dev } from '$app/env'
import browserEnv from './env.browser'
import { join, resolve } from 'path'

if (browser) {
  throw new Error(
    'file `serverEnv.ts` is included from a browser file. This exposes sensitive constants. Review your architecture!'
  )
}

/**
 * Do NOT attempt to roll this logic by abstracting keys away. Vite (the bundler) does a full
 * text search and replace on env constants, the full `import.meta.env.XXX` line needs to be present
 */

const props = {
  github_client_id: import.meta.env.VITE_GITHUB_OAUTH_CLIENT_ID,
  github_client_secret: import.meta.env.VITE_GITHUB_OAUTH_CLIENT_SECRET,
  stripe_secret_key: import.meta.env.VITE_STRIPE_SECRET_KEY,
  stripe_api_version: import.meta.env.VITE_STRIPE_API_VERSION,
  stripe_webhook_secret: import.meta.env.VITE_STRIPE_WEBHOOK_SECRET,
  // the server can have access to all browser env, no problem
  ...browserEnv
}

export const projectRoot =
  '/' + resolve(import.meta.url.replace(/^file:\/+/, '/'), '../..').replace(/^\/+|\/$/g, '')

export const fromRoot = (path: string) => join(projectRoot, path)

const check = () => {
  if (dev) {
    if (props.stripe_public_key && props.stripe_public_key.startsWith('sk')) {
      const error = `ENV ERROR: 
  A Stripe SECRET key is set as a PUBLIC key.
  Make sure the VITE_STRIPE_PUBLIC_KEY environment variable
  starts with "pk_" and not "sk_".
  Aborting
  `
      console.error(error)
      process.exit(1)
    }
  }

  const makeError = (text: string) => {
    const error = `ENV ERROR:
  "${text}" is not set in the .env file. 
  Make sure you have an .env file at the root of the project with that value set.
  This variable is read in ${import.meta.url}.
  It should be set in '.env.development.local' or '.env.production.local' depending on your environment
`
    return error
  }

  const hasMissingFields = (props: Record<string, any>) =>
    Object.keys(props)
      .filter((key) => typeof props[key] == 'undefined' || !props[key])
      .map((key) => {
        const err = makeError('VITE_' + key.toUpperCase())
        console.error(err)
      }).length > 0

  const checkAndDie = (props: Record<string, any>) => hasMissingFields(props) && process.exit(1)

  return checkAndDie
}

check()

export default props
