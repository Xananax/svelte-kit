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

interface ImportMetaEnv {
  VITE_GITHUB_OAUTH_CLIENT_ID: string
  VITE_GITHUB_OAUTH_CLIENT_SECRET: string
}
