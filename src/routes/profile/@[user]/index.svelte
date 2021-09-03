<script lang="ts">
  import { session } from '$app/stores'
  import Link from '$c/Link.svelte'

  const { user } = $session
</script>

<template>
  <h1>Hello {user}!</h1>
  <Link href="/profile/logout">log out</Link>
</template>
