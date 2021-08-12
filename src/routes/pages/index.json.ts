import type { RequestHandler } from '@sveltejs/kit'
import { basename, extname } from 'path'
import { loadPostMetadata } from '$lib/loadPostMetadata'
import { dayjs } from '$lib/dayjs'
import { getFileTime } from '$lib/getFileTime'
import { makeModuleLoader } from '$lib/makeModuleLoader'

const sortByOrder = ({ order: a }, { order: b }) => a - b

const slugFromPath = (path: string) => basename(path, extname(path))

const load = loadPostMetadata(slugFromPath, getFileTime(import.meta.url))

const getModules = makeModuleLoader(import.meta.glob(`./*.{md,svx,svelte.md,svelte}`), load)

const now = dayjs(Date.now())
const date = now.format(`YYYY-MM-DDTHH`)
const date_unix = now.unix()

export const get: RequestHandler = async () => {
  const pages = getModules().then(
    (modules) =>
      [
        { title: 'Home', href: '/', slug: '', date, date_unix },
        ...modules.sort(sortByOrder),
        { title: 'Courses', href: '/posts', slug: 'posts', date, date_unix }
      ] as PageMetadata[]
  )
  return { body: JSON.stringify(await pages) }
}
