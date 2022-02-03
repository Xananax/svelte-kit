<script context="module" lang="ts">
  import type { ErrorLoad } from '@sveltejs/kit'
  export const load: ErrorLoad = (a) => {
    console.log(a)
    const { error, status } = a
    return {
      props: {
        message: error.message,
        status
      }
    }
  }
</script>

<script lang="ts">
  export let message: string
  export let status: number
</script>

<template>
  <h1>Error {status}</h1>
  <p>{message}</p>
  {#if status == 404}
    <p>Please look elsewhere</p>
  {:else}
    <p>You need to be authorized</p>
  {/if}
</template>
