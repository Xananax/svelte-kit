<script lang="ts">
  import PageHead from '$lib/components/PageHead.svelte'
  import PostTitle from '$lib/components/PostTitle.svelte'
  import PostMeta from '$lib/components/PostMeta.svelte'

  export let title: PostMetadataAugmented['title']
  export let slug: PostMetadataAugmented['slug']
  export let date: PostMetadataAugmented['date']
  export let author: PostMetadataAugmented['author']
  export let description: PostMetadataAugmented['description']
  export let href: PostMetadataAugmented['href']
</script>

<PageHead {title} {description} />

<PostTitle {title} {href} {slug} />
<PostMeta {author} {date} />

<div>
  <slot />
</div>
