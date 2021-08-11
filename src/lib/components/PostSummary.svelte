<script lang="ts">
  import PostTitle from '$lib/components/PostTitle.svelte'
  import PostMeta from '$lib/components/PostMeta.svelte'
  import type { Dayjs } from 'dayjs'

  export let title: string
  export let slug: string
  export let date: Dayjs
  export let author: string
  export let description: string
  export let href: string
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
