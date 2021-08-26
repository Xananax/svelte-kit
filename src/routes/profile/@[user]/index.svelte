<script lang="ts">
  import { session } from '$app/stores'
  import { base } from '$app/paths'
  const { user } = $session
</script>

<template>
  <h1>Hello {user}!</h1>
  <a href="{base}/profile/logout">log out</a>
</template>
