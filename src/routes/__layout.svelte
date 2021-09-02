<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'
  import { base } from '$app/paths'
  import { dayjs } from '$lib/dayjs'

  const processPage = (post: PageMetadata): PageMetadataAugmented => ({
    ...post,
    date: dayjs(post.date),
    href: `${base}${post.href}` // TODO: WHY IS THIS NECESSARY BOTH HERE AND IN makeMetadata?????
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
  import Header from '$c/Navigation.svelte'
  import '../app.stylus'

  const year = new Date().getFullYear()
  export let pages: PageMetadata[]
</script>

<template lang="pug">
  Header("{pages}")
  main
    slot
  footer
    p 
      | (c) 2015-2021 
      a(href="https://twitter.com/NathanGDQuest" target="_blank" rel="noopener") GDQuest
      |  | 
      a(href="/pages/legal") mentions légales
</template>

<style lang="stylus">
  footer
    display flex
    flex-direction column
    justify-content center
    align-items center
    padding 40px
    background-color #222
    color #fdfdfd
    a
      font-weight bold
      color #fdfdfd
      text-decoration none
  @media (min-width: 480px)
    footer
      padding 40px 0
</style>
