import type { RequestHandler } from '@sveltejs/kit'
import { StatusCodes } from 'http-status-codes'
import { omit } from '$lib/omit'
import { pages } from '../courses/api.json'
import type Stripe from 'stripe'

export type StripeMetadata = import('stripe').Stripe.MetadataParam &
  Omit<PostMetadata, 'pathParts' | 'inMenu' | 'published' | 'children' | 'price' | 'stripe_id'>
export type PriceCreateParams = import('stripe').Stripe.PriceCreateParams
export type StripeLineItem = Stripe.Checkout.SessionCreateParams.LineItem
export type ProductCreateParams = import('stripe').Stripe.ProductCreateParams & {
  metadata: StripeMetadata
}
export type StripeCreateParams = {
  product: ProductCreateParams
  price: PriceCreateParams
  lineItem: StripeLineItem
}

export const isPriceCreateParams = (price: any): price is PriceCreateParams => {
  if (!price) {
    return false
  }
  if (typeof price !== 'object') {
    return false
  }
  return 'currency' in price && 'unit_amount' in price
}

const defaultPriceParams: PriceCreateParams = {
  currency: 'usd',
  unit_amount: 0,
  tax_behavior: 'exclusive'
}

export const products: Record<PostMetadata['slug'], StripeCreateParams> = {}

export const productsList = Object.entries(pages)
  .map(([slug, { price: unit_amount, stripe_id: id, ...rest }]) => {
    const price: PriceCreateParams = {
      ...defaultPriceParams,
      ...(typeof unit_amount === 'number'
        ? { unit_amount }
        : isPriceCreateParams(unit_amount)
        ? unit_amount
        : null)
    }
    if (!price.unit_amount || price.unit_amount <= 0) {
      return
    }
    const metadata: StripeMetadata = omit(rest, 'pathParts', 'inMenu', 'published', 'children')
    const product: ProductCreateParams = {
      name: metadata.title,
      caption: metadata.description,
      description: metadata.description,
      id,
      metadata: metadata,
      shippable: false,
      type: 'good',
      url: `gdquest.com/courses/`
    }
    const lineItem: StripeLineItem = {
      quantity: 1,
      price_data: {
        ...price,
        product_data: {
          name: metadata.title,
          description: metadata.description
        }
      }
      //dynamic_tax_rates: [''] TODO: is this necessary?
    }
    const params: StripeCreateParams = { price, product, lineItem }
    products[slug] = params
    return params
  })
  .filter(Boolean)

export const get: RequestHandler = async (event) => {
  return {
    status: StatusCodes.OK,
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(products)
  }
}

export const getOne: RequestHandler = async ({ params: { slug }, url, locals: { user } }) => {
  if (!(slug in products)) {
    return { status: StatusCodes.NOT_FOUND }
  }

  const product = products[slug]
  console.log('hello', product)
  return {
    status: StatusCodes.OK,
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(product)
  }
}
