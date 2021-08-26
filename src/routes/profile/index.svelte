<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'

  export const load: Load = ({ session: { user } }) => {
    console.log({ user })
    /*
    return {
      status: 302,
      redirect: user ? `/profile/@${user}` : '/profile/login'
    }
    */
    return {
      props: { user }
    }
  }
</script>

<script lang="ts">
  import { base } from '$app/paths'
  export let user: string
</script>

<template>
  <p>
    {#if user}
      <a href="{base}/profile/logout">log out</a>
      <a href="{base}/profile/@{user}">profile</a>
    {:else}
      <a href="{base}/profile/login">log in</a>
    {/if}
  </p>
</template>
