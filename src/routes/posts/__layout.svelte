<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'
  import { dayjs } from '$lib/dayjs'

  const processPost = (post: PostMetadata): PostMetadataAugmented => ({
    ...post,
    date: dayjs(post.date),
    href: `/posts/${post.slug}`
  })

  export const load: Load = async ({ page, fetch }) => {
    const path = page.path.replace(/\/?posts\/?/, '')

    if (!path) {
      const posts = (await fetch(`/posts/all.json`).then((res) => res.json())).map(processPost)
      return {
        props: {
          posts
        }
      }
    }

    const post = await fetch(`/posts/${path}.json`)
      .then((res) => res.json())
      .then(processPost)

    if (!post) {
      return {
        status: 404,
        error: new Error('Post could not be found')
      }
    }

    return {
      props: {
        post
      }
    }
  }
</script>

<script lang="ts">
  import PostFull from '$lib/components/PostFull.svelte'
  import PostSummary from '$lib/components/PostSummary.svelte'

  export let post: PostMetadataAugmented
  export let posts: PostMetadataAugmented[]
</script>

<template>
  {#if post}
    <PostFull {...post}>
      <slot />
    </PostFull>
  {:else}
    {#each posts as post (post.slug)}
      <PostSummary {...post} />
    {/each}
  {/if}
</template>
