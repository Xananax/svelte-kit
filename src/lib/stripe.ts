import Stripe from 'stripe'
import env from '$lib/config/serverEnv'

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
