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
  export let user: string
</script>

<template>
  <p>
    {#if user}
      <a href="/profile/logout">log out</a>
      <a href="/profile/@{user}">profile</a>
    {:else}
      <a href="/profile/login">log in</a>
    {/if}
  </p>
</template>
