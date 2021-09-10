import { loadProductsFromDisk } from './loadProductsFromDisk.js'
import { uploadProductsToStripe } from './uploadProductsToStripe.js'
import { writeProductsJson, productsJsonExists, filePath } from './writeSiteData.js'

const createAndUpload = () =>
  loadProductsFromDisk()
    .then(uploadProductsToStripe)
    .then(writeProductsJson)
    .then(() => {
      console.log(`products uploaded and json file written`)
      process.exit(0)
    })
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })

const createAndUploadIfNecessary = async () => {
  if (await productsJsonExists()) {
    console.log(`file ${filePath} exists, please delete it before creating products`)
    return Promise.resolve()
  }
  return createAndUpload()
}

createAndUploadIfNecessary()
