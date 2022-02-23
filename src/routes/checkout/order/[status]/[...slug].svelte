<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'

  export const load: Load = async ({ params }) => {
    const { status: statusStr, slug } = params
    const success = statusStr === 'success'
    return {
      props: {
        success,
        slug
      }
    }
  }
</script>

<script lang="ts">
  export let slug: string
  export let success: boolean
  const status = success ? 'success' : 'cancel'
</script>

<template lang="pug">
  h1 {status}
  p {slug}
</template>
