//@ts-check
import { basename } from 'path'
import { getPackageJson } from './utils.js'

export const { name, version, homepage } = getPackageJson()

export const is_prod = process.env.NODE_ENV === 'production'

export const path = homepage ? basename(homepage) : ''

export const base = path ? `/${path}` : ''

/**
 * Don't forget to also change [../src/config/env.ts](../src/config/env.ts)
 */
export const environmentVariables = {
  'process.env.NAME': `"${name}"`,
  'process.env.VERSION': `"${version}"`,
  'process.env.HOMEPAGE': `"${homepage}"`
}
