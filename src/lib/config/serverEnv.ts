import { browser, dev } from '$app/env'
import { checkAndDie } from './envUtils'
import browserEnv from './browserEnv'

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

if (dev) {
  checkAndDie(props)
}

export default props
