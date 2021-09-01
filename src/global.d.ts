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

interface PostMetadata {
  title: string
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

type PostMetadataAugmented = Omit<PostMetadata, 'date' | 'children'> & {
  date: Dayjs
  children: PostMetadataAugmented[]
}

type ModulePostMetadata = Partial<Omit<PostMetadata, 'date_unix'>>

interface SvelteModule {
  default: {
    render: () => unknown
    $$render: () => unknown
  }
  metadata: ModulePostMetadata
}

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
