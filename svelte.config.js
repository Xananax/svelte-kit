import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-static'
//import adapter from '@sveltejs/adapter-node'
import { mdsvex, extensions } from './build-scripts/mdsvex.config.js'
import define, { is_prod, base } from './build-scripts/globalEnv.js'
import { mdsvexGlobalComponents } from './build-scripts/mdsvexGlobalComponents.js'
import { resolve } from 'path'

const globalComponents = mdsvexGlobalComponents({
  file: `$lib/MarkdownImports.ts`,
  list: ['Note', 'Youtube', 'Ref', 'Link'],
  extensions
})

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...extensions],
  preprocess: [preprocess(), globalComponents, mdsvex],
  kit: {
    target: '#svelte',
    vite: {
      define,
      resolve: {
        alias: {
          $c: resolve('./src/lib/components'),
          $assets: resolve('./src/lib/assets')
        }
      }
    },
    paths: {
      base: is_prod ? base : ''
    },
    adapter: adapter()
  }
}

export default config
