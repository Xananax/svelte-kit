<script lang="ts">
  import RefLink from './RefLink.svelte'
  export let list: PostMetadata[] = []
</script>

<template>
  <ul>
    {#each list as { slug, title } (slug)}
      <li>
        <RefLink {slug}>{title}</RefLink>
      </li>
    {/each}
  </ul>
</template>

<style lang="stylus">
  ul
    background-color red
</style>
