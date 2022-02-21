// Use it from the command line:
// test $(curl -sf http://localhost:3000/init) = "true"
import type { RequestHandler } from '@sveltejs/kit'
import { run as stripe } from '../init/stripe'

let hasInitiated = false

export const get: RequestHandler = async () => {
  const body = hasInitiated ? true : await initSequence
  return { body }
}

const initSequence = (async (): Promise<boolean> => {
  await stripe()
  return true
})()

initSequence.then(() => (hasInitiated = true))
