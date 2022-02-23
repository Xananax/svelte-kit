import { fromRoot } from '$config/env.server'
import { productsList } from '../../routes/checkout/api.json'
import { readOrCreateCacheFile, writeToCacheFile } from './cacheFile'
import type { StripeCache } from './cacheFile'
import { uploadProductsToStripe } from './uploadProductsToStripe'

export const cacheFilePath = fromRoot('products.json')
const stripeCache = readOrCreateCacheFile(cacheFilePath)

export const run = async () => {
  const newProducts = productsList.filter(({ product: { id } }) => !(id in stripeCache))

  if (newProducts.length) {
    await uploadProductsToStripe(newProducts).then((uploadedProducts) => {
      const newStripeCache = uploadedProducts.reduce((obj, stripeConfig) => {
        obj[stripeConfig.id] = stripeConfig
        return obj
      }, {} as StripeCache)
      const cache = { ...stripeCache, ...newStripeCache }
      writeToCacheFile(cacheFilePath, cache)
    })
  } else {
    console.log('nothing new to upload')
  }
}
