<script lang="ts">
  import { page } from '$app/stores'
  import { clickOutside } from '$lib/useClickOutside'
  import Link from '$c/Link.svelte'

  export let user: String = ''

  $: url = $page.url.pathname.startsWith('/profile/@') ? '' : $page.url.pathname

  let hidden = true
  const toggle = () => (hidden = !hidden)
  const close = () => (hidden = true)
</script>

<template>
  <nav class="user" use:clickOutside on:outclick={close}>
    {#if user}
      <div class="profile">
        <button class="icon" on:click={toggle} aria-label="Open user menu">
          {user}
        </button>
        <div class="menu" class:hidden>
          <Link href="/profile/">{user}'s Profile</Link>
          <Link href="/profile/logout?url={url}">log out</Link>
        </div>
      </div>
    {:else}
      <Link href="/profile/login?url={url}">log in</Link>
    {/if}
  </nav>
</template>

<style lang="stylus">
  nav
    display flex
    justify-content center
    align-items center
  
  .profile, .icon
    width  25px
    height 25px
    position relative
  
  .icon
    background none
    color inherit
    border none
    padding 0
    font inherit
    cursor pointer
    outline inherit

  .menu
    position absolute
    top calc(100% + 5px)
    right -10px
    width 150px
    background #333
    display flex
    flex-direction column
    justify-content center

  .hidden
    display none
</style>
