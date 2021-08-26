<script lang="ts">
  import { session } from '$app/stores'
  const { user } = $session
</script>

<template>
  <p>{user}</p>
</template>
