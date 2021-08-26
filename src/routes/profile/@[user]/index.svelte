<script lang="ts">
  import { session } from '$app/stores'
  const { user } = $session
</script>

<template>
  <h1>Hello {user}!</h1>
  <a href="/profile/logout">log out</a>
</template>
