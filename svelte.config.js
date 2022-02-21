//@ts-check
import adapter from '@sveltejs/adapter-auto'
import preprocess from 'svelte-preprocess'
import { resolve } from 'path'
import {
  environmentVariables,
  is_prod,
  base,
  mdsvex,
  extensionsMDSvex,
  mdsvexGlobalComponents
} from './config/index.js'

const extensions = ['.svelte', ...extensionsMDSvex]

const globalComponents = mdsvexGlobalComponents({
  list: ['Note', 'Youtube', 'Ref', 'Link'].map((comp) => `$c/${comp}.svelte`),
  extensions
})

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions,
  preprocess: [preprocess(), mdsvex, globalComponents],
  kit: {
    adapter: adapter(),
    methodOverride: {
      allowed: ['PATCH', 'DELETE']
    },
    paths: {
      base: is_prod ? base : ''
    },
    vite: {
      define: environmentVariables,
      optimizeDeps: {
        exclude: ['svelte-kit-cookie-session']
      },
      resolve: {
        alias: {
          $c: resolve('./src/components'),
          $config: resolve('./src/config'),
          $assets: resolve('./src/assets')
        }
      }
    }
  }
}

export default config
