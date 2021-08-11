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
}

type PostMetadataAugmented = Omit<PostMetadata, 'date'> & { date: Dayjs; href: string }

type ModulePostMetadata = Partial<Omit<PostMetadata, 'date_unix'>>
