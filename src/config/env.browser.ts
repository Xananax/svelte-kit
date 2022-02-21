/**
 * These values are set in config/env.js
 * MAKE SURE TO NOT EXPOSE SENSITIVE DATA, this file is read by the client
 * For server-only environment variables, use `serverEnv.ts`
 */
export const name = process.env.NAME
export const version = Number(process.env.VERSION ?? 0)
export const homepage = process.env.HOMEPAGE

/**
 * Do NOT attempt to roll this logic by abstracting keys away. Vite (the bundler) does a full
 * text search and replace on env constants, the full `import.meta.env.XXX` line needs to be present
 */

const props = {
  stripe_public_key: import.meta.env.VITE_STRIPE_PUBLIC_KEY
}

export default props
