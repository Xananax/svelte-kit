/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />

interface Fetch {
  (info: RequestInfo, init?: RequestInit): Promise<Response>
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
  path: string
}

type PostMetadataAugmented = Omit<PostMetadata, 'date'> & { date: Dayjs; href: string }

type ModulePostMetadata = Partial<Omit<PostMetadata, 'date_unix'>>

interface SvelteModule {
  default: {
    render: () => unknown
    $$render: () => unknown
  }
  metadata: ModulePostMetadata
}

interface ImportMetaModules {
  [path: string]: () => Promise<SvelteModule>
}

type PageMetadata = Pick<
  PostMetadataAugmented,
  'title' | 'href' | 'slug' | 'date' | 'date_unix'
> & { href?: string }

type PageMetadataAugmented = Omit<PageMetadata, 'date'> & { date: Dayjs; href: string }
