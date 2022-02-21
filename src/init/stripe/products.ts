import { pages } from '../../routes/courses/api/[...slug]'
import { omit } from '$lib/omit'

export type StripeMetadata = import('stripe').Stripe.MetadataParam &
  Omit<PostMetadata, 'pathParts' | 'inMenu' | 'published' | 'children' | 'price' | 'stripe_id'>
export type PriceCreateParams = import('stripe').Stripe.PriceCreateParams
export type ProductCreateParams = import('stripe').Stripe.ProductCreateParams & {
  metadata: StripeMetadata
}
export type StripeCreateParams = {
  product: ProductCreateParams
  price: PriceCreateParams
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

const defaultPriceParams = { currency: 'usd', unit_amount: 0 }

export const products = Object.values(pages)
  .map(({ price: unit_amount, stripe_id: id, ...rest }) => {
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
    const params: StripeCreateParams = { price, product }
    return params
  })
  .filter(Boolean)
