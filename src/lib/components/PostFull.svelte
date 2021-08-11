<script lang="ts">
  import PageHead from '$lib/components/PageHead.svelte'
  import PostTitle from '$lib/components/PostTitle.svelte'
  import PostMeta from '$lib/components/PostMeta.svelte'
  import type { Dayjs } from 'dayjs'

  export let title: string
  //export let slug: string;
  export let date: Dayjs
  export let author: string
  export let description: string
  export let href: string
</script>

<PageHead {title} {description} />

<PostTitle {title} {href} />
<PostMeta {author} {date} />

<div>
  <slot />
</div>
