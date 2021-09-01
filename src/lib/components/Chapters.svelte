<script lang="ts">
  import Ref from './RefLink.svelte'
  export let list: PostMetadata[] = []
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
