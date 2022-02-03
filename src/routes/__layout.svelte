<script context="module" lang="ts">
  import { StatusCodes } from 'http-status-codes'
  import type { Load } from '@sveltejs/kit'
  import { base } from '$app/paths'
  import { dayjs } from '$lib/dayjs'
  // TODO: Why is this not working? See: https://github.com/pngwn/MDsveX/discussions/292
  import { a } from '$lib/MarkdownImports'
  export { a }

  const processPage = (post: PageMetadata): PageMetadataAugmented => ({
    ...post,
    date: dayjs(post.date),
    href: `${post.href}` // TODO: WHY IS THIS NECESSARY BOTH HERE AND IN makeMetadata?????
  })

  export const load: Load = async ({ fetch, session: { user }, page }) => {
    const goto = page.query.get('goto')

    if (goto) {
      return { redirect: `${base}${goto}`, status: StatusCodes.TEMPORARY_REDIRECT }
    }
    const pages = (await fetch(`${base}/pages.json`).then((res) => res.json())).map(processPage)
    return {
      props: {
        pages,
        user
      }
    }
  }
</script>

<script lang="ts">
  import MainNavigation from '$c/MainNavigation.svelte'
  import Link from '$c/Link.svelte'
  import '../app.stylus'

  const year = new Date().getFullYear()
  export let pages: PageMetadata[]
  export let user
</script>

<template lang="pug">
  MainNavigation("{pages}" {user})
  main
    slot
  footer
    p 
      | (c) 2015-2021 
      Link(href="https://twitter.com/NathanGDQuest" social) GDQuest
      |  | 
      Link(href="/pages/legal") mentions légales
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
    :global(a)
      font-weight bold
      color #fdfdfd
      text-decoration none
  @media (min-width: 480px)
    footer
      padding 40px 0
</style>
