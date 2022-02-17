import { extractYamlFromDirectory } from '../utils'
import { readFile, writeFile } from 'fs/promises'

export const readOrCreateCacheFile = async (file: string) => {
  try {
    const contents = await readFile(file, 'utf8')
    try {
      const data = JSON.parse(contents)
      return data
    } catch (e) {
      throw new Error(`could not parse ${file}`)
    }
  } catch (e) {
    return writeToCacheFile(file, {})
  }
}

export const writeToCacheFile = async <T>(file: string, data: T) => {
  try {
    const str = JSON.stringify(data)
    try {
      writeFile(file, str, 'utf8')
      return data
    } catch (e) {
      throw new Error(`could not read or write ${file}`)
    }
  } catch (e) {
    throw new Error(`could not turn ${data} to json`)
  }
}

export const collectProducts = (dir: string) =>
  extractYamlFromDirectory(dir).then((mdFiles) => mdFiles.filter(({ data: { price } }) => price))

export const getNewProducts = async (dir: string, cache: string) => {
  const data = await readOrCreateCacheFile(cache)
  const newProducts = await collectProducts(dir).then((mdFiles) =>
    mdFiles
      .filter(({ data: { slug } }) => !(slug in data))
      .map(({ data: { price, title } }) => ({
        product: {
          name: title,
          caption: '',
          description: '',
          id: '',
          metadata: {},
          shippable: false,
          url: `gdquest.com/courses/`
        } as import('stripe').Stripe.ProductCreateParams,
        price
      }))
  )
  return newProducts
}
