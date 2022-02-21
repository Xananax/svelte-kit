<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'
  import { StatusCodes } from 'http-status-codes'
  import { base } from '$app/paths'
  import { augmentPage } from '$lib/metadata'

  export const load: Load = async ({ url, fetch, session: { user } }) => {
    const goto = url.searchParams.get('goto')

    if (goto) {
      return { redirect: `${base}${goto}`, status: StatusCodes.TEMPORARY_REDIRECT }
    }

    const pages = await fetch(`${base}/pages.json`)
      .then((res) => res.json())
      .then((pages) => pages.map(augmentPage))

    return {
      props: {
        user,
        pages
      }
    }
  }
</script>

<script lang="ts">
  import '../app.stylus'
  import { page } from '$app/stores'
  import MainNavigation from '$c/MainNavigation.svelte'

  export let user: App.Session['user']
  export let pages: PageMetadata[] = []
</script>

<template lang="pug">
  MainNavigation({user} {pages})
  main
    slot
  footer
    +each('pages as page')
      li {page.menuTitle}
</template>

<style>
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
    box-sizing: border-box;
  }

  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px;
  }

  @media (min-width: 480px) {
    footer {
      padding: 40px 0;
    }
  }
</style>
