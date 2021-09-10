import { readFileSync } from 'fs'
import { join, basename, dirname } from 'path'

const __dirname = dirname(dirname(import.meta.url).replace(/^file:\/+/, ''))
const package_json_location = join(__dirname, '..', 'package.json')

export const { name, version, homepage } = JSON.parse(
  readFileSync(package_json_location, 'utf8')
)

export const path = homepage ? basename(homepage) : ''

export const is_prod = process.env.NODE_ENV === 'production'

export const base = path ? `/${path}` : ''

/**
 * Don't forget to also change [../src/lib/config/env.ts](../src/lib/config/env.ts)
 */
export default {
  'process.env.NAME': `"${name}"`,
  'process.env.VERSION': `"${version}"`,
  'process.env.HOMEPAGE': `"${homepage}"`
}
