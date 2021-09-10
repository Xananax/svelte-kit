import { writeFileSync, existsSync, unlinkSync } from 'fs'
import { fromRoot } from '../utils.js'

export const filePath = fromRoot('src/routes/products/productsData.json')

export const writeProductsJson = (products: Product[]) =>
  writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf8')

export const productsJsonExists = async () => existsSync(filePath)

export const deleteProductsJson = async () => {
  const exists = await productsJsonExists()
  if (exists) {
    unlinkSync(filePath)
    return true
  }
  return false
}
