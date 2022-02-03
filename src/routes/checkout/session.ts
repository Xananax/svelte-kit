import { StatusCodes } from 'http-status-codes'
import type { Request, RequestHandler } from '@sveltejs/kit'
import { createStripeSession } from '$lib/stripe'

export const post: RequestHandler = async (req: Request<any, { priceId: string }>) => {
  const { priceId } = req.body
  if (typeof priceId !== 'string') {
    return {
      status: StatusCodes.BAD_REQUEST,
      body: {
        error: new Error(`priceId is required`)
      }
    }
  }
  try {
    const session = await createStripeSession(req.host, priceId)
    return {
      status: StatusCodes.OK,
      body: {
        sessionId: session.id
      }
    }
  } catch (err) {
    console.error(`ERROR: ${err.message}`)
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      body: {
        error: err.message
      }
    }
  }
}
