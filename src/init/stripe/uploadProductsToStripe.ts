import Stripe from 'stripe'
import type { StripeCreateParams } from './products'
import props from '$config/env.server'

const { stripe_secret_key, stripe_api_version } = props

export const uploadProductsToStripe = async (products: StripeCreateParams[]) => {
  const stripe = new Stripe(stripe_secret_key, { apiVersion: stripe_api_version })
  const uploaded = await Promise.all(
    products
      .map(async (params) => {
        console.log(`Uploading \`${params.product.name}\``)
        const stripeProduct = await stripe.products.create(params.product)
        const stripePrice = await stripe.prices.create({
          ...params.price,
          product: stripeProduct.id
        })
        console.log(stripeProduct)
        const id = params.product.id
        return { id, product: stripeProduct, price: stripePrice }
      })
      .filter(Boolean as any as ExcludesFalse)
  )
  console.log(
    `Uploaded courses: ${new Intl.ListFormat('en').format(
      uploaded.map((p) => '`' + p.product.name + '`')
    )}`
  )
  return uploaded
}

export type StripeConfig = Awaited<ReturnType<typeof uploadProductsToStripe>>[0]
