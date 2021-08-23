<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'
  import { base } from '$app/paths'
  import { dayjs } from '$lib/dayjs'

  const processPage = (post: PageMetadata): PageMetadataAugmented => ({
    ...post,
    date: dayjs(post.date)
  })

  export const load: Load = async ({ fetch }) => {
    const pages = (await fetch(`${base}/pages.json`).then((res) => res.json())).map(processPage)
    return {
      props: {
        pages
      }
    }
  }
</script>

<script lang="ts">
  import Header from '$c/Header.svelte'
  import Debug from '$c/Debug.svelte'
  import '../app.stylus'

  export let pages: PageMetadata[]
</script>

<template lang="pug">
  Header("{pages}")
  Debug("{base}" "{pages}")
  main
    slot
  footer
    p visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit
</template>

<style lang="stylus">
  main
    flex 1
    display flex
    flex-direction column
    padding 1rem
    width 100%
    max-width 1024px
    margin 0 auto
    box-sizing border-box

  footer
    display flex
    flex-direction column
    justify-content center
    align-items center
    padding 40px
    a
      font-weight bold

  @media (min-width: 480px)
    footer
      padding 40px 0
</style>
