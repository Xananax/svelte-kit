<script lang="ts">
  import Link from '$c/Link.svelte'
  export let slug: PostMetadataAugmented['slug']
  export let title: PostMetadataAugmented['title']
  export let href: PostMetadataAugmented['href']
  const id = slug
</script>

<template lang="pug">

  h3({id}).heading
    Link({href} class="heading-link") {title}

</template>

<style lang="stylus">
  .heading
    margin 0
    font-size 1.8rem
    :global(.heading-link)
      text-decoration none
      color var(--heading-color)
</style>
