// create one at https://dashboard.stripe.com/test/webhooks
import { StatusCodes } from 'http-status-codes'
import type { RequestHandler } from '@sveltejs/kit'
import { stripe } from '$lib/stripe'
import type { Stripe } from 'stripe'
import env from '$config/env.server'

const { stripe_webhook_secret } = env

const constructEvent = (rawBody: string | Buffer, signature: string): Stripe.Event | Error => {
  try {
    const event = stripe.webhooks.constructEvent(rawBody, signature, stripe_webhook_secret)
    return event
  } catch (err) {
    return err
  }
}

export const post: RequestHandler = async ({ request }) => {
  const signature = request.headers.get('stripe-signature')
  const stripeEvent = constructEvent(await request.text(), signature)
  if (stripeEvent instanceof Error) {
    return {
      status: StatusCodes.BAD_REQUEST,
      body: `Webhook Error: ${stripeEvent.message}`
    }
  }

  const { data: _data, type } = stripeEvent

  console.log(stripeEvent)

  switch (type) {
    case 'checkout.session.completed':
      // const checkout = event.data.object;
      // Payment is successful and the subscription is created.
      // You should provision the subscription and save the customer ID to your database.
      // - saving a copy of the order in your own database.
      // - Sending the customer a receipt email.
      console.log('Event: checkout.session.completed')
      break
    case 'invoice.paid':
      // const invoice = event.data.object;
      // Continue to provision the subscription as payments continue to be made.
      // Store the status in your database and check when a user accesses your service.
      // This approach helps you avoid hitting rate limits.
      console.log('Event: invoice.paid')
      break
    case 'invoice.payment_failed':
      //  const invoice = event.data.object;
      // The payment failed or the customer does not have a valid payment method.
      // The subscription becomes past_due. Notify your customer and send them to the
      // customer portal to update their payment information.
      console.log('Event: invoice.payment_failed')
      break
    default:
      console.log(stripeEvent)
  }

  return {
    status: StatusCodes.OK
  }
}
