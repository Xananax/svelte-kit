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
  import Link from '$c/Link.svelte'

  export let user: string
</script>

<template>
  <p>
    {#if user}
      <Link href="/profile/logout">log out</Link>
      <Link href="/profile/@{user}">profile</Link>
    {:else}
      <Link href="/profile/login">log in</Link>
    {/if}
  </p>
</template>
