import preprocess from 'svelte-preprocess'
import { mdsvex, extensions } from './build/mdsvex.config.js'
import { mdsvexGlobalComponents } from './build/mdsvexGlobalComponents.js'
import { resolve } from 'path'

const globalComponents = mdsvexGlobalComponents({
  dir: `$lib/components`,
  list: ['Note.svelte', 'Youtube.svelte', 'RefLink.svelte'],
  extensions
})

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...extensions],
  preprocess: [preprocess(), mdsvex],
  kit: {
    target: '#svelte',
    vite: {
      resolve: {
        alias: {
          $c: resolve('./src/lib/components'),
          $g: resolve('./src/lib/globalComponents.ts')
        }
      }
    }
  }
}

export default config
