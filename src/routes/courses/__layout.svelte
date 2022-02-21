<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'
  import type { MetadataResponse } from './api/[...slug]'
  import { strip } from '$lib/path'
  import { augmentMetadata } from '$lib/metadata'
  import { base } from '$app/paths'

  export const load: Load = async ({ url: { pathname }, fetch, session: { user } }) => {
    const apiPath = strip(pathname.replace(/^\/courses/, ''))
    const apiUrl = `${base}/courses/api${apiPath ? '/' + apiPath : ''}`

    const { data, isList }: MetadataResponse = await (await fetch(apiUrl)).json()
    const list = data.map(augmentMetadata)

    const props = isList ? { list } : { post: list[0] }

    return { props }
  }
</script>

<script lang="ts">
  import Title from '$c/Title.svelte'
  import Debug from '$c/Debug.svelte'
  export let list: PostMetadataAugmented[] = null
  export let post: PostMetadataAugmented = null
  const isCourse = post?.levels == 1
  const isChapter = post?.levels > 1
  $: title = post?.title ?? 'Courses'
</script>

<template>
  <Debug {...{ post, list }} />
  <Title {title} />
  {#if post}
    {#if isCourse}
      <h1>Course: {title}</h1>
    {:else if isChapter}
      <h1>Chapter: {title}</h1>
    {/if}
    <slot />
  {:else if list && list.length}
    <ul>
      {#each list as { title, href, description, author, date, slug } (slug)}
        <li>
          <Link {href}>{slug}</Link>
        </li>
      {/each}
      <slot />
    </ul>
  {/if}
</template>
