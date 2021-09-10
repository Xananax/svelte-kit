import Stripe from 'stripe'
import { getEnvFile } from '../utils.js'

const { VITE_STRIPE_SECRET_KEY: secretKey, VITE_STRIPE_API_VERSION: apiVersion } = getEnvFile()
const stripe = new Stripe(secretKey, { apiVersion })

export const uploadProductsToStripe = (products: Product[]) =>
  Promise.all(
    products.map(async (product) => {
      // Only create the product if it's not free
      if (product.price.unit_amount > 0) {
        const stripeProduct = await stripe.products.create(product.product)
        const stripePrice = await stripe.prices.create({
          ...product.price,
          product: stripeProduct.id
        })
        console.log(`${product.product.name} id: ${stripeProduct.id}`)
        product.product.id = stripeProduct.id
        product.price.id = stripePrice.id
      }
      return product
    })
  )
