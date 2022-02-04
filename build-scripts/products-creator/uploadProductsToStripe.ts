import Stripe from 'stripe'

const wait = () => new Promise((ok) => setTimeout(ok, 500))

export const uploadProductsToStripe =
  (secretKey: string, apiVersion: '2020-08-27', dryrun = false) =>
  async (products: Product[]) => {
    const stripe = new Stripe(secretKey, { apiVersion })
    const uploaded = await Promise.all(
      products.map(async (product) => {
        // Only create the product if it's not free
        if (product.price.unit_amount <= 0) {
          return false
        }
        if (dryrun) {
          console.log(`Fake uploading \`${product.product.name}\``)
          await wait()
          return product
        }
        console.log(`Uploading \`${product.product.name}\``)
        const stripeProduct = await stripe.products.create(product.product)
        const stripePrice = await stripe.prices.create({
          ...product.price,
          product: stripeProduct.id
        })
        //console.log(`${product.product.name} id: ${stripeProduct.id}`)
        product.product.id = stripeProduct.id
        product.price.id = stripePrice.id
        return product
      })
    )
    type ExcludesFalse = <T>(x: T | false) => x is T
    const prods = uploaded.filter(Boolean as any as ExcludesFalse)

    console.log(
      `Uploaded courses: ${new Intl.ListFormat('en').format(
        prods.map((p) => '`' + p.product.name + '`')
      )}`
    )
    return prods
  }
