import preprocess from 'svelte-preprocess'
import { mdsvex, extensions } from './mdsvex.config.js'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...extensions],
  preprocess: [preprocess(), mdsvex],
  kit: {
    target: '#svelte'
  }
}

export default config
