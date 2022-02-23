<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'
  import type { MetadataResponse } from './api.json'
  import { augmentMetadata } from '$lib/metadata'
  import { base } from '$app/paths'

  export const load: Load = async ({ params: { slug }, fetch, session: { user } }) => {
    const apiUrl = `${base}/${slug}.json`

    const { data }: MetadataResponse = await (await fetch(apiUrl)).json()
    const post = data.map(augmentMetadata)[0]

    return { props: { post } }
  }
</script>

<script lang="ts">
  import Title from '$c/Title.svelte'
  import Debug from '$c/Debug.svelte'
  export let post: PostMetadataAugmented = null
  const isCourse = post?.levels == 1
  const isChapter = post?.levels > 1
</script>

<template>
  <Debug {...{ post }} />
  <Title title={post.title} />
  {#if isCourse}
    <h1>Course: {post.title}</h1>
  {:else if isChapter}
    <h1>Chapter: {post.title}</h1>
  {/if}
  <slot />
</template>
