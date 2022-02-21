<script context="module">
  import Title from '$c/Title.svelte'
  import { browser, dev } from '$app/env'
  import Content from '$c/Content.svelte'

  // we don't need any JS on this page, though we'll load
  // it in dev so that we get hot module replacement...
  export const hydrate = dev

  // ...but if the client-side router is already loaded
  // (i.e. we came here from elsewhere in the app), use it
  export const router = browser

  // since there's no dynamic data here, we can prerender
  // it so that it gets served as a static asset in prod
  export const prerender = true

  export const metadata = {
    title: 'About',
    order: 1
  }
</script>

<template lang="pug">
  Title(title="{metadata.title}")
  Content(white="{false}")
    h1 About this app
  Content
    p 
      | This is a 
      Link(href="https://kit.svelte.dev") SvelteKit
      |  app. You can make your own by typing the following into your command line and following the prompts:
    pre npm init svelte@next
    p
      | The page you're looking at is purely static HTML, with no client-side interactivity needed.
      | Because of that, we don't need to load any JavaScript. Try viewing the page's source, or opening
      | the devtools network panel and reloading.
    slot
</template>
