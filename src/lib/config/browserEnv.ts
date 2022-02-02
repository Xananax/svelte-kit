/**
 * Do NOT attempt to roll this logic by abstracting keys away. Vite (the bundler) does a full
 * text search and replace on env constants, the full `import.meta.env.XXX` line needs to be present
 */

const props = {
  stripe_public_key: import.meta.env.VITE_STRIPE_PUBLIC_KEY
}

export default props
