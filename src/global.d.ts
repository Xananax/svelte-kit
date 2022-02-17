/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />

interface Fetch {
  (info: RequestInfo, init?: RequestInit): Promise<Response>
}

type ImportSveltePromisesModules = Record<string, () => Promise<SvelteModule>>
type ImportSvelteMetaModules = Record<string, SvelteModule>

interface ImportMeta {
  glob(pattern: string): ImportSveltePromisesModules
  globEager(pattern: string): ImportSvelteMetaModules
}

/**
 * Represents a post, as loaded from disk,
 * with the added date_unix value, which shouldn't
 * be part of a file's user-entered metadata
 */
interface PostMetadata {
  title: string
  menuTitle: string
  inMenu: boolean
  date: string
  date_unix: number
  slug: string
  description: string
  author: string
  date: string
  published: boolean
  order: number
  levels: number
  root: string
  path: string
  pathParts: string[]
  href: string
  children: PostMetadata[]
  price?: import('stripe').Stripe.PriceCreateParams | 0
}

/**
 * The metadata of a file, as entered by a user. `date_unix` doesn't exist, and
 * all properties are optional
 */
type ModulePostMetadata = Partial<Omit<PostMetadata, 'date_unix'>>

/**
 * Represents a post in the client, after being loaded from the database.
 * The main difference is that its children are parsed, and the date field
 * is a DayJs object
 */
type PostMetadataAugmented = Omit<PostMetadata, 'date' | 'children'> & {
  date: Dayjs
  children: PostMetadataAugmented[]
}

/**
 * Anything loaded from a dynamic glob like import.glob or import.globEager
 */
interface SvelteModule {
  default: {
    render: () => unknown
    $$render: () => unknown
  }
  metadata: ModulePostMetadata
}

/**
 * Pages are like posts, but have less fields
 */
type PageMetadata = Pick<
  PostMetadataAugmented,
  'title' | 'href' | 'slug' | 'date' | 'date_unix' | 'pathParts'
> & { href?: string }

type PageMetadataAugmented = Omit<PageMetadata, 'date'> & {
  date: Dayjs
}

interface UploadableProduct {
  product: Omit<import('stripe').Stripe.ProductCreateParams, 'id'>
  price: import('stripe').Stripe.PriceCreateParams
  includes: string[]
}

interface Product {
  product: import('stripe').Stripe.ProductCreateParams
  price: import('stripe').Stripe.PriceCreateParams & { id: string }
}

interface ImportMetaEnv {
  VITE_GITHUB_OAUTH_CLIENT_ID: string
  VITE_GITHUB_OAUTH_CLIENT_SECRET: string
  VITE_STRIPE_SECRET_KEY: string
  VITE_STRIPE_API_VERSION: '2020-08-27'
  VITE_STRIPE_WEBHOOK_SECRET: string
  VITE_STRIPE_PUBLIC_KEY: string
}

declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    // defined in: src/lib/useClickOutside.ts
    onoutclick?: () => void
  }
}

type User = string

declare namespace App {
  interface Locals {
    user?: User
  }

  interface Platform {}

  interface Session {
    user?: User
  }

  interface Stuff {}
}

/*
type positiveDigits = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type digit = 0 | positiveDigits
type YYYY = `19${digit}${digit}` | `20${digit}${digit}`
type MM = `0${positiveDigits}` | `1${0 | 1 | 2}`
type DD = `${0}${positiveDigits}` | `${1 | 2}${digit}` | `3${0 | 1}`
type hh = `${0 | 1}${digit}` | `2${0 | 1 | 2 | 3}`
type mm = `0${digit}` | `${1 | 2 | 3 | 4 | 5}${digit}`
type ss = mm
type DateYM = `${YYYY}-${MM}`
type DateYMD = `${YYYY}-${MM}-${DD}`
type TimeHhMm = `${hh}:${mm}`
type TimeHhMmSs = `${hh}:${mm}:${ss}`
// unfortunately, Typescript borks at the combinatorial explosion here:
type DateYMDHHMMSS = `${DateYMD}T${TimeHhMmSs}Z`
*/
type d = number
type DateYMDHhMmSs = `${d}${d}${d}${d}-${d}${d}-${d}${d}T${d}${d}:${d}${d}:${d}${d}Z`

const DateString: unique Symbol
type DateString = string & { [DateString]: true }

const UUID: unique symbol
type UUID = string & { [UUID]: true }

/** until https://github.com/microsoft/TypeScript/issues/46907 passes */
declare namespace Intl {
  type ListType = 'conjunction' | 'disjunction'

  interface ListFormatOptions {
    localeMatcher?: 'lookup' | 'best fit'
    type?: ListType
    style?: 'long' | 'short' | 'narrow'
  }

  interface ListFormatPart {
    type: 'element' | 'literal'
    value: string
  }

  class ListFormat {
    constructor(locales?: string | string[], options?: ListFormatOptions)
    format(values: any[]): string
    formatToParts(values: any[]): ListFormatPart[]
    supportedLocalesOf(locales: string | string[], options?: ListFormatOptions): string[]
  }
}
