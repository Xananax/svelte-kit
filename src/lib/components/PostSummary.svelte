<script lang="ts">
  import PostTitle from '$c/PostTitle.svelte'
  import PostMeta from '$c/PostMeta.svelte'
  import Link from '$c/Link.svelte'

  export let title: PostMetadataAugmented['title']
  export let slug: PostMetadataAugmented['slug']
  export let date: PostMetadataAugmented['date']
  export let author: PostMetadataAugmented['author']
  export let description: PostMetadataAugmented['description']
  export let href: PostMetadataAugmented['href']
</script>

<template lang="pug">
  article
    PostTitle({slug} {title} {href})
    PostMeta({author} {date})
    p
      | {description}
      Link({href}) Read More &rarr;
    slot
</template>

<style lang="stylus">
  article
    margin-bottom calc(var(--spacing-unit) * 8)
</style>
