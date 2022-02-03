<script lang="ts">
  import { page } from '$app/stores'
  import UserIcon from 'svelte-icons/fa/FaUser.svelte'
  import { clickOutside } from '$lib/useClickOutside'
  import Link from '$c/Link.svelte'

  const url = $page.path.startsWith('/profile/@') ? '' : $page.path

  export let user: String = ''
  let visible = false
  const toggle = () => (visible = !visible)
  const close = () => (visible = false)
</script>

<template>
  <nav class="user" use:clickOutside on:outclick={close}>
    {#if user}
      <div class="profile">
        <button class="icon" on:click={toggle} aria-label="Open user menu">
          <UserIcon />
        </button>
        {#if visible}
          <div class="menu">
            <Link href="/profile/">{user}'s Profile</Link>
            <Link href="/profile/logout?url={url}">log out</Link>
          </div>
        {/if}
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
    width 100px
    background #333
    & > *
      padding 5px
      margin-bottom 12px
      margin-top 0

</style>
