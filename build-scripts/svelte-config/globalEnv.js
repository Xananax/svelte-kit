import { basename } from 'path'
import { getPackageJson } from '../utils.js'


export const { name, version, homepage } = getPackageJson()

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
