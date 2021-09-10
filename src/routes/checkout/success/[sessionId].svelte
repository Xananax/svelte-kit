<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'

  export const load: Load = async ({ page: { params } }) => {
    const { sessionId } = params
    return {
      props: {
        sessionId
      }
    }
  }
</script>

<script lang="ts">
  export let sessionId: string
</script>

<template lang="pug">
  h1 Success
  p {sessionId}
</template>
