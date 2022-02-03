<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'

  export const load: Load = ({ session: { user } }) => {
    return {
      status: 302,
      redirect: user ? `/profile/@${user}` : '/profile/login'
    }
  }
</script>

<script lang="ts">
  import Link from '$c/Link.svelte'

  export let user: string
</script>

<template />
