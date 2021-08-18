<script lang="ts">
  import PageHead from '$c/PageHead.svelte'
  import PostTitle from '$c/PostTitle.svelte'
  import PostMeta from '$c/PostMeta.svelte'

  export let title: PostMetadataAugmented['title']
  export let slug: PostMetadataAugmented['slug']
  export let date: PostMetadataAugmented['date']
  export let author: PostMetadataAugmented['author']
  export let description: PostMetadataAugmented['description']
  export let href: PostMetadataAugmented['href']
  export let children: PostMetadataAugmented['children']
</script>

<template lang="pug">
  PageHead({title} {description})
  PostTitle({title} {href} {slug})
  PostMeta({author} {date})
  div
    slot
  +if('children')
    ul
      +each('children as { title, href, slug } (slug)')
        li
          a({href}) {title}
</template>
