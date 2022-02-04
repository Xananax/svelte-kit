import { writeFileSync, existsSync, unlinkSync } from 'fs'
import { fromRoot, relToRoot } from '../utils.js'

export const productsFilePath = fromRoot('src/routes/products/productsData.ts')

export const writeProductsJson =
  (fresh = false, dryrun = false) =>
  async (products: Product[]) => {
    const exists = await productsFileExists()
    if (exists && !dryrun) {
      if (fresh) {
        unlinkSync(productsFilePath)
      } else {
        throw new Error(
          `File \`${productsFilePath}\` exists, please delete it before creating products`
        )
      }
    }

    const productsStr = JSON.stringify(products.filter(Boolean), null, 2).replace(
      /  "(.*?)": (\{|"|\d|\[)/g,
      `  $1: $2`
    )
    const file = `
/** THIS FILE IS AUTOMATICALLY GENERATED FROM ${relToRoot(import.meta.url)} **/
/** DO NOT TOUCH OR MODIFY IT IN ANY WAY **/

/**
 * List of products available on Stripe
 */
export const products: Product[] = ${productsStr};
`
    if (dryrun) {
      console.log(file)
      console.log(`File \`${productsFilePath}\` is not written (dry run)`)
    } else {
      writeFileSync(productsFilePath, file, 'utf8')
      console.log(`File \`${productsFilePath}\` written`)
    }
  }

export const productsFileExists = async () => existsSync(productsFilePath)
