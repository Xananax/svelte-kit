<script lang="ts">
  import { page } from '$app/stores'
  import logo from './svelte-logo.svg'

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
    .corner
      a(href="https://kit.svelte.dev")
        img(src="{logo}" alt="SvelteKit")
    nav
      svg(viewbox="0 0 2 3" aria-hidden="true")
        path(d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z")
      ul
        +each('pagesList as { href, title, active } (href)')
          li(class:active)
            a(sveltekit:prefetch href="{href}") {title}
      svg(viewbox="0 0 2 3" aria-hidden="true")
        path(d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z")
    .corner

</template>

<style lang="stylus">
  header
    display flex
    justify-content space-between
  .corner
    width 3em
    height 3em
    a
      display flex
      align-items center
      justify-content center
      width 100%
      height 100%
    img
      width 2em
      height 2em
      object-fit contain
  nav
    display flex
    justify-content center
    --background rgba(255, 255, 255, 0.7)
    a
      display flex
      height 100%
      align-items center
      padding 0 1em
      color var(--heading-color)
      font-weight 700
      font-size 0.8rem
      text-transform uppercase
      letter-spacing 10%
      text-decoration none
      transition color 0.2s linear
  svg
    width 2em
    height 3em
    display block
  path
    fill var(--background)
  ul
    position relative
    padding 0
    margin 0
    height 3em
    display flex
    justify-content center
    align-items center
    list-style none
    background var(--background)
    background-size contain
  li
    position relative
    height 100%
    &.active
      &::before
        --size 6px
        content ''
        width 0
        height 0
        position absolute
        top 0
        left calc(50% - var(--size))
        border var(--size) solid transparent
        border-top var(--size) solid var(--accent-color)
  a
    &:hover
      color var(--accent-color)
</style>
