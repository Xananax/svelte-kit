<script lang="ts">
  export let slug: PostMetadataAugmented['slug']
  export let title: PostMetadataAugmented['title']
  export let href: PostMetadataAugmented['href']
  const id = slug
</script>

<template lang="pug">

  h3({id}).heading
    a({href}) {title}

</template>

<style lang="stylus">
  .heading
    margin 0
    font-size 1.8rem
  a
    text-decoration none
    color var(--heading-color)
</style>
