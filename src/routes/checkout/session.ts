import type { Request, RequestHandler } from '@sveltejs/kit'
import { createStripeSession } from '$lib/stripe'

export const post: RequestHandler = async (req: Request<any, { priceId: string }>) => {
  const { priceId } = req.body
  if (typeof priceId !== 'string') {
    return {
      status: 400,
      body: {
        error: new Error(`priceId is required`)
      }
    }
  }
  try {
    const session = await createStripeSession(req.host, priceId)
    return {
      status: 200,
      body: {
        sessionId: session.id
      }
    }
  } catch (err) {
    console.error(`ERROR: ${err.message}`)
    return {
      status: 500,
      body: {
        error: err.message
      }
    }
  }
}
