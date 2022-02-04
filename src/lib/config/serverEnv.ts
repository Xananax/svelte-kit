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
  if (props.stripe_public_key && props.stripe_public_key.startsWith('sk')) {
    const error = `ENV ERROR: 
  A Stripe SECRET key is set as a PUBLIC key.
  Make sure the VITE_STRIPE_PUBLIC_KEY environment variable
  starts with "pk_" and not "sk_".
  Aborting
  `
    process.exit(0)
  }
  checkAndDie(props)
}

export default props
