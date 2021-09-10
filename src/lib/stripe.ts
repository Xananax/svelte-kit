import Stripe from 'stripe'
import { stripe_secret_key, stripe_api_version as apiVersion } from '$lib/config/serverEnv'

export const stripe = new Stripe(stripe_secret_key, { apiVersion })

export const createStripeSession = async (host: string, priceId: string, quantity = 1) =>
  stripe.checkout.sessions.create({
    mode: 'subscription',
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
