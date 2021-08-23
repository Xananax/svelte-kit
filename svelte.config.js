import preprocess from 'svelte-preprocess'
//import adapterStatic from '@sveltejs/adapter-static'
import node from '@sveltejs/adapter-node'
import { mdsvex, extensions } from './svelte-kit/mdsvex.config.js'
import { mdsvexGlobalComponents } from './svelte-kit/mdsvexGlobalComponents.js'
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
    },
    paths: {
      //base: '/your-repo-name'
    },
    adapter: node()
  }
}

export default config
