import Stripe from 'stripe'
import env from '$config/env.server'
import { browser } from '$app/env'

if (browser) {
  throw new Error(
    'file `stripe.ts` is included from a browser file. This exposes sensitive constants. Review your architecture!'
  )
}

const { stripe_secret_key, stripe_api_version: apiVersion } = env

export const stripe = new Stripe(stripe_secret_key, { apiVersion })

export const createStripeSession = async (host: string, priceId: string, quantity = 1) =>
  stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity
      }
    ],
    success_url: `http://${host}/checkout/success/{CHECKOUT_SESSION_ID}`,
    cancel_url: `http://${host}/`
  })
