<script lang="ts">
  import MetaTags from '$c/PageMeta/MetaTags.svelte'
  import PostTitle from '$c/PostTitle.svelte'
  import PostMeta from '$c/PostMeta.svelte'
  import Content from '$c/Content.svelte'
  import Link from '$c/Link.svelte'

  export let title: PostMetadataAugmented['title']
  export let slug: PostMetadataAugmented['slug']
  export let date: PostMetadataAugmented['date']
  export let author: PostMetadataAugmented['author']
  export let description: PostMetadataAugmented['description']
  export let href: PostMetadataAugmented['href']
  export let children: PostMetadataAugmented['children']
</script>

<template lang="pug">
  MetaTags({description})
  Content(white="{false}")
    PostTitle({title} {href} {slug})
    PostMeta({author} {date})
  +if('children && children.length')
    Content(white="{false}").table-of-contents
      ul
        +each('children as { title, href, slug } (slug)')
          li
            Link({href}) {title}
  Content
    slot
</template>
