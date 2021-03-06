<script lang="ts">
  import { page } from '$app/stores'
  import { socialMedia, homepage } from '$config/socialMedia'
  import SocialMediaIcon from '$c/SocialMediaIcon.svelte'
  import Link from '$c/Link.svelte'
  import UserArea from '$c/UserArea.svelte'

  export let pages: PageMetadataAugmented[] = []
  export let user: App.Session['user']

  const markActivePage = (currentPath: string[]) => (page: PageMetadataAugmented) => {
    const active =
      page.pathParts[0] === 'pages'
        ? page.slug === currentPath[1]
        : page.pathParts[0] === currentPath[0]
    return { ...page, active }
  }

  $: currentPath = $page.url.pathname.replace(/^\/|\/$/g, '').split('/')
  $: pagesList = pages.map(markActivePage(currentPath))
</script>

<template lang="pug">
  header
    Link(href="{homepage}" class="logo") logo
    nav.site-links
      +each('pagesList as { href, menuTitle, active } (href)')
        Link(prefetch {active} {href}) {menuTitle}
    nav.social-media
      +each('socialMedia as {name, description, href} (href)')
        Link({href} social)
          SocialMediaIcon(icon="{name}" class="social-media-icon") {description}
    UserArea({user})
    slot
</template>

<style lang="stylus">
  header
    display flex
    justify-content center
    height 5em
  nav
    display flex
    justify-content center
  .social-media
    :global(.social-media-icon)
      height 1.3em
  header
    :global(a)
      display flex
      align-items center
      justify-content center
      text-align center
      box-sizing border-box
      padding 1em
      font-weight 700
      font-size 0.8rem
      text-transform uppercase
      text-decoration none
      transition color 1s ease-out
      font-family montserrat, sans-serif
      color var(--heading-color)
      text-shadow 0 2px 2px rgba(0,0,0,.2)
      border-bottom 4px solid transparent
      border-top 4px solid transparent
      &:hover
        color var(--accent-color)
        transition color .2s ease-in
        text-decoration none
    :global(.active)
      border-bottom-color var(--heading-color)
    :global(.active:hover), :global(.logo:hover)
      color var(--heading-color)
</style>
