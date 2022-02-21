import { readFileSync, writeFileSync } from 'fs'
import type { StripeConfig } from './uploadProductsToStripe'

export const readOrCreateCacheFile = (filePath: string) => {
  let contents: string
  try {
    contents = readFileSync(filePath, 'utf8')
  } catch (e) {
    return writeToCacheFile(filePath, {})
  }
  try {
    const data = JSON.parse(contents)
    return data as StripeCache
  } catch (e) {
    throw new Error(`could not parse ${filePath}`)
  }
}

export const writeToCacheFile = (filePath: string, data: StripeCache) => {
  let jsonString: string
  try {
    jsonString = JSON.stringify(data, null, 2)
  } catch (e) {
    throw new Error(`could not turn ${data} to json`)
  }
  try {
    writeFileSync(filePath, jsonString, 'utf8')
    return data
  } catch (e) {
    throw new Error(`could not read or write ${filePath}`)
  }
}

export type StripeCache = Record<StripeConfig['id'], StripeConfig>
