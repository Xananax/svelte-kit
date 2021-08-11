import type { RequestHandler } from '@sveltejs/kit'
import { basename, extname } from 'path'
import { loadPostMetadata } from '$lib/loadPostMetadata'
import { dayjs } from '$lib/dayjs'

const sortByOrder = ({ order: a }, { order: b }) => a - b

const slugFromPath = (path: string) => basename(path, extname(path))

const load = loadPostMetadata(import.meta.url, slugFromPath)

const modules = Object.entries(
  import.meta.glob(`./*.{md,svx,svelte.md,svelte}`) as ImportMetaModules
)

const now = dayjs(Date.now())
const date = now.format(`YYYY-MM-DDTHH`)
const date_unix = now.unix()

const pages = Promise.all(modules.map((pair) => load(...pair))).then(
  (modules) =>
    [
      { title: 'Home', href: '/', slug: '', date, date_unix },
      ...modules.sort(sortByOrder),
      { title: 'Courses', href: '/posts', slug: 'posts', date, date_unix }
    ] as PageMetadata[]
)

export const get: RequestHandler = async () => {
  return { body: JSON.stringify(await pages) }
}
