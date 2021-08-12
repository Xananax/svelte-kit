import preprocess from 'svelte-preprocess'
import { mdsvex, extensions } from './build/mdsvex.config.js'
import { mdsvexGlobalComponents } from './build/mdsvexGlobalComponents.js'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...extensions],
  preprocess: [
    preprocess(),
    mdsvexGlobalComponents({
      dir: `$lib/components`,
      list: ['Note.svelte'],
      extensions
    }),
    mdsvex
  ],
  kit: {
    target: '#svelte'
  }
}

export default config
