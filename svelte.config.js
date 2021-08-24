import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-static'
//import adapter from '@sveltejs/adapter-node'
import { mdsvex, extensions } from './svelte-kit/mdsvex.config.js'
//import { mdsvexGlobalComponents } from './svelte-kit/mdsvexGlobalComponents.js'
import { resolve } from 'path'
import { readFileSync } from 'fs'
import { join, basename, dirname } from 'path'

const is_prod = process.env.NODE_ENV === 'production'
const __dirname = dirname(import.meta.url).replace(/^file:\//, '')
const { name, title, version, homepage } = JSON.parse(
  readFileSync(join(__dirname, 'package.json'), 'utf8')
)

const path = homepage ? basename(homepage) : ''
const base = path ? `/${path}` : ''

/*
const globalComponents = mdsvexGlobalComponents({
  dir: `$lib/components`,
  list: ['Note.svelte', 'Youtube.svelte', 'RefLink.svelte'],
  extensions
})

const multi = function (adapters) {
    return {
        name: 'Multi Adapter',
        async adapt(argument) {
            await adapters.forEach(item => Promise.resolve(item).then(resolved => resolved.adapt(argument)))
        }
    };
}

const config = {
    kit: {
        adapter: multi([staticAdapter(), nodeAdapter()]),
        target: '#svelte',
    }
};
*/

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...extensions],
  preprocess: [preprocess(), mdsvex],
  kit: {
    target: '#svelte',
    vite: {
      define: {
        'process.env.NAME': `"${name}"`,
        'process.env.TITLE': `"${title}"`,
        'process.env.VERSION': `"${version}"`,
        'process.env.HOMEPAGE': `"${homepage}"`
      },
      resolve: {
        alias: {
          $c: resolve('./src/lib/components'),
          $g: resolve('./src/lib/globalComponents.ts')
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
