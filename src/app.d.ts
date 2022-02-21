/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />

// See https://kit.svelte.dev/docs/typescript
// for information about these interfaces

type User = string

declare namespace App {
  interface Locals {
    user: User
  }

  interface Platform {}

  interface Session {
    user: User
  }

  interface Stuff {}
}

declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    // defined in: src/lib/useClickOutside.ts
    onoutclick?: () => void
  }
}

type ImportSveltePromisesModules = Record<string, () => Promise<SvelteModule>>
type ImportSvelteMetaModules = Record<string, SvelteModule>

interface ImportMeta {
  glob(pattern: string): ImportSveltePromisesModules
  globEager(pattern: string): ImportSvelteMetaModules
}

interface SvelteModule {
  default: {
    render: () => unknown
    $$render: () => unknown
  }
  metadata: ModulePostMetadata
}

interface ImportMetaEnv {
  VITE_GITHUB_OAUTH_CLIENT_ID: string
  VITE_GITHUB_OAUTH_CLIENT_SECRET: string
  VITE_STRIPE_SECRET_KEY: string
  VITE_STRIPE_API_VERSION: '2020-08-27'
  VITE_STRIPE_WEBHOOK_SECRET: string
  VITE_STRIPE_PUBLIC_KEY: string
}

type d = number
type DateYMDHhMmSs = `${d}${d}${d}${d}-${d}${d}-${d}${d}T${d}${d}:${d}${d}:${d}${d}Z`

interface OAuthStateParams {
  goto: string
  key: string
}

type GithubProfile = {
  login: string
  id: number
  node_id: string
  avatar_url: string //https://avatars.githubusercontent.com/u/<id>
  gravatar_id: string
  url: string // https://api.github.com/users/<user_id>
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: 'User'
  site_admin: boolean
  name: string
  company: unknown
  blog: ''
  location: unknown
  email: string
  hireable: unknown
  bio: unknown
  twitter_username: unknown
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: DateYMDHhMmSs //'2011-06-07T21:03:31Z',
  updated_at: DateYMDHhMmSs //'2021-08-24T11:39:24Z'
}

/**
 * The metadata of in the header of a markdown file, as entered by a user.
 * `date_unix` doesn't exist, and all properties are optional
 */
interface ModulePostMetadata {
  title?: string
  menuTitle?: string
  inMenu?: boolean
  date?: string
  slug?: string
  description?: string
  author?: string
  date?: string
  published?: boolean
  order?: number
  levels?: number
  root?: string
  path?: string
  pathParts?: string[]
  href?: string
  children?: PostMetadata[]
  price?: import('stripe').Stripe.PriceCreateParams | number
}

/**
 * Represents a post, as loaded from disk,
 * with the added date_unix value
 */
type PostMetadata = Required<ModulePostMetadata> & {
  date_unix: number
  isCourse: bool
  isChapter: bool
  // don't set this, it will be generated from slug and date
  stripe_id: `prod_${string}`
}

/**
 * Represents a post in the client, after being loaded from the database.
 * The main difference is that its children are parsed, and the date field
 * is a DayJs object
 */
type PostMetadataAugmented = Omit<PostMetadata, 'date' | 'children' | 'stripe_id'> & {
  date: Dayjs
  children: PostMetadataAugmented[]
}

/**
 * Pages are like posts, but have less fields
 */
type PageMetadata = Pick<
  PostMetadataAugmented,
  'title' | 'menuTitle' | 'href' | 'slug' | 'date' | 'date_unix' | 'pathParts'
> & { href?: string }

type PageMetadataAugmented = Omit<PageMetadata, 'date'> & {
  date: Dayjs
}

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

type ExcludesFalse = <T>(x: T | false) => x is T
