import type { Request, RequestHandler, Response } from '@sveltejs/kit'
import { stripe } from '$lib/stripe'
import env from '$lib/config/serverEnv'

const { stripe_webhook_secret } = env

const constructEvent = (rawBody: string, signature: string) => {
  try {
    const event = stripe.webhooks.constructEvent(rawBody, signature, stripe_webhook_secret)
    return event
  } catch (err) {
    return err
  }
}

export const post: RequestHandler = async (req: Request<any, { data: any; type: any }>) => {
  const signature = req.headers['stripe-signature']
  const event = await constructEvent(req.rawBody as string, signature)
  if (event instanceof Error) {
    return {
      status: 400,
      body: `Webhook Error: ${event.message}`
    }
  }

  const { data, eventType } = event

  switch (eventType) {
    case 'checkout.session.completed':
      // const checkout = event.data.object;
      // Payment is successful and the subscription is created.
      // You should provision the subscription and save the customer ID to your database.
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
    // Unhandled event type
  }

  return {
    status: 200
  }
}
