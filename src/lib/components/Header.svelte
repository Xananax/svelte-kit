<script lang="ts">
  import { page } from '$app/stores'
  import { homepage } from '$lib/env'
  import Logo from './Logo.svelte'

  export let pages: PageMetadataAugmented[] = []

  const markActivePage = (currentPath: string[]) => (page: PageMetadataAugmented) => {
    const active =
      page.pathParts[0] === 'pages'
        ? page.slug === currentPath[1]
        : page.pathParts[0] === currentPath[0]
    return { ...page, active }
  }

  $: currentPath = $page.path.replace(/^\/|\/$/g, '').split('/')
  $: pagesList = pages.map(markActivePage(currentPath))
</script>

<template lang="pug">
  header
    a(href="{homepage}")
      Logo
    nav
      +each('pagesList as { href, title, active } (href)')
        a(sveltekit:prefetch class:active {href}) {title}
</template>

<style lang="stylus">
  header
    display flex
    justify-content center
    height 5em
    background var(--heading-color)
  nav
    display flex
    justify-content center
  a
    display flex
    align-items center
    justify-content center
    box-sizing border-box
    padding 1em
    font-weight 700
    font-size 0.8rem
    text-transform uppercase
    letter-spacing 10%
    text-decoration none
    transition color 0.1 linear, background 0.2s 0.3s linear
  nav
    a
      &.active
        color var(--heading-color)
        background var(--accent-color)
        transition color 0.2s 0.2s linear, background 0.2s 0.1s linear
      &:hover
        color #fdfdfd
        background var(--heading-color)
        transition color 0.2s 0.2s linear, background 0.2s 0.1s linear
        text-decoration none
</style>
