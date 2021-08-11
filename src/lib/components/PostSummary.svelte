<script lang="ts">
  import PostTitle from '$lib/components/PostTitle.svelte'
  import PostMeta from '$lib/components/PostMeta.svelte'

  export let title: PostMetadataAugmented['title']
  export let slug: PostMetadataAugmented['slug']
  export let date: PostMetadataAugmented['date']
  export let author: PostMetadataAugmented['author']
  export let description: PostMetadataAugmented['description']
  export let href: PostMetadataAugmented['href']
</script>

<article>
  <PostTitle {slug} {title} {href} />
  <PostMeta {author} {date} />
  <p>
    {description}
    <a {href}>Read More &rarr;</a>
  </p>
  <slot />
</article>

<style>
  article {
    margin-bottom: calc(var(--spacing-unit) * 8);
  }
</style>
