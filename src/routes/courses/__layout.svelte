<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'
  import { toAPIPath, toHref } from './api/_consts'
  import { dayjs } from '$lib/dayjs'
  import type { Response } from './api/[...slug]/index'

  export const augmentMetadata = (metadata: PostMetadata): PostMetadataAugmented => {
    const { date, slug, children } = metadata
    const href = toHref(slug)
    return {
      ...metadata,
      href,
      date: dayjs(date),
      children: children.map(augmentMetadata)
    }
  }

  export const handleResponse = async (response: Response) => {
    switch (response.isList) {
      case true:
        const list = response.data.map(augmentMetadata)
        return {
          list
        }
      case false:
        const post = augmentMetadata(response.data)
        const isCourse = post.levels == 1
        const isChapter = post.levels > 1
        const md = (await import(`../posts/${post.path}`)).default
        return {
          post,
          md,
          isCourse,
          isChapter
        }
    }
  }

  export const load: Load = async ({ page: { path }, fetch }) => {
    const response: Response = await (await fetch(toAPIPath(path))).json()
    const props = await handleResponse(response)
    return { props }
  }
</script>

<script lang="ts">
  import type { SvelteComponent } from 'svelte'
  import { children } from 'svelte/internal'

  export let list: PostMetadataAugmented[] = []
  export let post: PostMetadataAugmented = null
  export let isCourse = false
  export let isChapter = false
  export let md: SvelteComponent | false = false
  $: text = JSON.stringify({ post, list }, null, 2)
</script>

<template>
  <details>
    <summary>received JSON</summary>
    <code>
      <pre>
        { text }
      </pre>
    </code>
  </details>
  {#if post}
    {#if isCourse}
      <h1>{post.title}</h1>
    {:else if isChapter}
      <h1>{post.title}</h1>
    {/if}
    {#if md}
      <svelte:component this={md} />
    {/if}
    {#if post.children}
      <ul>
        {#each post.children as { title, href, slug } (slug)}
          <li><a {href}>{title}</a></li>
        {/each}
      </ul>
    {/if}
  {:else if list}
    <ul>
      {#each list as { title, href, slug } (slug)}
        <li><a {href}>{title}</a></li>
      {/each}
    </ul>
  {/if}
  <slot />
</template>
