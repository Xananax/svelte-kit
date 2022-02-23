// Fake stripe credit card: use 4242 4242 4242 4242
import type { RequestHandler } from '@sveltejs/kit'
import { StatusCodes } from 'http-status-codes'
import { products } from './api.json'
import { stripe } from '$lib/stripe'

export const get: RequestHandler = async ({ url, locals: { user } }) => {
  const slug = url.searchParams.get('slug')
  if (!slug || !(slug in products)) {
    return {
      status: StatusCodes.NOT_FOUND
    }
  }
  const base_url = `http://${url.host}/checkout/order/`

  const { lineItem } = products[slug]
  try {
    const session = await stripe.checkout.sessions.create({
      customer_email: 'customer@example.com', // TODO: use user's email
      mode: 'payment',
      automatic_tax: { enabled: true },
      payment_method_types: ['card'],
      line_items: [lineItem],
      success_url: `${base_url}success/${slug}`,
      cancel_url: `${base_url}cancel/${slug}`
    })
    return {
      status: StatusCodes.SEE_OTHER,
      headers: {
        location: session.url
      }
    }
  } catch (err) {
    console.error(`ERROR: ${err.message}`)
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      body: {
        title: 'ERROR',
        error: err.message
      }
    }
  }
}
