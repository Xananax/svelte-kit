<script lang="ts">
  import RefLink from './RefLink.svelte'
  export let list: PostMetadata[] = []
  console.log({ list })
</script>

<template>
  <ul>
    {#each list as { slug, title } (slug)}
      <li />
    {/each}
  </ul>
</template>

<style lang="stylus">
  ul
    background-color red
</style>
