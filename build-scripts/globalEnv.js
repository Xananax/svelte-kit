import { readFileSync } from 'fs'
import { join, basename, dirname } from 'path'

const __dirname = dirname(dirname(import.meta.url).replace(/^file:\//, ''))

export const { name, title, version, homepage } = JSON.parse(
  readFileSync(join(__dirname, 'package.json'), 'utf8')
)

export const path = homepage ? basename(homepage) : ''

export const is_prod = process.env.NODE_ENV === 'production'

export const base = path ? `/${path}` : ''

export default {
  'process.env.NAME': `"${name}"`,
  'process.env.TITLE': `"${title}"`,
  'process.env.VERSION': `"${version}"`,
  'process.env.HOMEPAGE': `"${homepage}"`
}
