import { loadProductsFromDisk } from './loadProductsFromDisk.js'
import { uploadProductsToStripe } from './uploadProductsToStripe.js'
import { writeProductsJson } from './writeSiteData.js'
import { buildCLI, exit, error } from '../command-parser/index.js'
import { getEnvFile } from '../utils.js'

const { VITE_STRIPE_SECRET_KEY, VITE_STRIPE_API_VERSION } = getEnvFile()

const defaultConfig = {
  secretkey: VITE_STRIPE_SECRET_KEY,
  apiversion: VITE_STRIPE_API_VERSION,
  fresh: false,
  dryrun: false
}

const createAndUpload = ({ secretkey, apiversion, fresh, dryrun } = defaultConfig) =>
  loadProductsFromDisk()
    .then(uploadProductsToStripe(secretkey, apiversion, dryrun))
    .then(writeProductsJson(fresh, dryrun))
    .then(() => {
      console.log(`All done!`)
      process.exit(0)
    })
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })

const parse = buildCLI(defaultConfig)`
Uploads products to Stripe.

Provide a secret key either through env variable VITE_STRIPE_SECRET_KEY, the 
env file, or the --key flag

Flags

  -h --help        this screen ${() => exit(parse.help)}
  -k --secret-key  Stripe secret key. Defaults to env variable${(args) => args.shift()}
  -v --api-version stripe api version
  -f --fresh       deletes previous generated files${(_) => true}
  -n --dry-run     simulates, but don't run anything${(_) => true}

Usage:

  node %script% -f -k sk_2348732423p49375862532
`

const options = parse(process.argv.slice(2))

const VALID_API = '2020-08-27'
if (options.apiversion !== VALID_API) {
  error(
    `API version is incorrect. Expected \`${VALID_API}\`, got \`${options.apiversion}\`. Please check your environment variables`
  )
}

if (!options.secretkey.startsWith('sk_')) {
  error(`Stripe secret key does not start with \`sk_\`. You're probably using the wrong one`)
}

if (options.dryrun) {
  console.log('dry run. No operation will actually run')
}

createAndUpload(options)
