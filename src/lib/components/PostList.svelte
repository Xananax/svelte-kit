<script lang="ts">
  import Content from '$c/Content.svelte'
  import PostSummary from '$c/PostSummary.svelte'

  export let list: PostMetadataAugmented[] = []
</script>

<template>
  <Content>
    {#each list as { title, href, description, author, date, slug } (slug)}
      <PostSummary {title} {slug} {date} {author} {description} {href} />
    {/each}
  </Content>
</template>
