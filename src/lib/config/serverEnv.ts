import { browser } from '$app/env'

if (browser) {
  throw new Error(
    'file `serverEnv.ts` is included from a browser file. This exposes sensitive constants. Review your architecture!'
  )
}

const err = (text: string) => {
  const error = `ENV ERROR:
  "${text}" is not set in the .env file. 
  Make sure you have an .env file at the root of the project with that value set
`
  console.error(error)
  process.exit(1)
}

/**
 * Do NOT attempt to serialize this logic by abstracting keys away. Vite (the bundler) does a full
 * text search and replace on env constants, the full `import.meta.env.XXX` line needs to be present
 */

export const github_client_id =
  import.meta.env.VITE_GITHUB_OAUTH_CLIENT_ID || err('VITE_GITHUB_OAUTH_CLIENT_ID')
export const github_client_secret =
  import.meta.env.VITE_GITHUB_OAUTH_CLIENT_SECRET || err('VITE_GITHUB_OAUTH_CLIENT_SECRET')

export const stripe_secret_key =
  import.meta.env.VITE_STRIPE_SECRET_KEY || err('VITE_STRIPE_SECRET_KEY')

export const stripe_api_version =
  import.meta.env.VITE_STRIPE_API_VERSION || err('VITE_STRIPE_API_VERSION')

export const stripe_webhook_secret =
  import.meta.env.VITE_STRIPE_WEBHOOK_SECRET || err('VITE_STRIPE_WEBHOOK_SECRET')

// Stripe's pubKey is used in the client, but we check it here to get a build-time error
// if it is missing
export const stripe_public_key =
  import.meta.env.VITE_STRIPE_PUBLIC_KEY || err('VITE_STRIPE_PUBLIC_KEY')
