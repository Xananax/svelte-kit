<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'
  import { toHref, modules, loadPageMetadata } from './_consts'
  import { dayjs } from '$lib/dayjs'

  const augmentMetadata = (metadata: PostMetadata): PostMetadataAugmented => {
    const { date, slug, children } = metadata
    const href = toHref(slug)
    return {
      ...metadata,
      href,
      date: dayjs(date),
      children: children.map(augmentMetadata)
    }
  }

  export const load: Load = async ({ page: { path }, fetch }) => {
    const response = await loadPageMetadata(path, fetch)
    switch (response.isList) {
      case true:
        const list = response.data.map(augmentMetadata)
        return {
          props: {
            list
          }
        }
      case false:
        const post = augmentMetadata(response.data)
        const isCourse = post.levels == 1
        const isChapter = post.levels > 1
        const md = modules[post.path]
        return {
          props: {
            post,
            md,
            isCourse,
            isChapter
          }
        }
    }
  }
</script>

<script lang="ts">
  import type { SvelteComponent } from 'svelte'
  import PostFull from '$c/PostFull.svelte'
  import PostSummary from '$c/PostSummary.svelte'
  import Debug from '$c/Debug.svelte'

  import type { PromiseValue } from 'type-fest'

  export let list: PostMetadataAugmented[] = []
  export let post: PostMetadataAugmented = null
  export let isCourse = false
  export let isChapter = false
  export let md: SvelteComponent | false = false
</script>

<template>
  <Debug {...{ post, list }} />
  {#if post}
    {#if isCourse}
      <PostFull
        title={post.title}
        slug={post.slug}
        date={post.date}
        author={post.author}
        description={post.description}
        href={post.href}
        children={post.children}
      >
        <svelte:component this={md} />
      </PostFull>
    {:else if isChapter}
      <PostFull
        title={post.title}
        slug={post.slug}
        date={post.date}
        author={post.author}
        description={post.description}
        href={post.href}
        children={post.children}
      >
        <svelte:component this={md} />
      </PostFull>
    {/if}
  {:else if list}
    <ul>
      {#each list as { title, href, description, author, date, slug } (slug)}
        <PostSummary {title} {slug} {date} {author} {description} {href} />
      {/each}
    </ul>
  {/if}
  <slot />
</template>
