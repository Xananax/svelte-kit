<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'
  import { base } from '$app/paths'
  import { toHref, modules, loadPageMetadata } from './index.json'
  import { dayjs } from '$lib/dayjs'

  const augmentMetadata = (metadata: PostMetadata): PostMetadataAugmented => {
    const { date, slug, children } = metadata
    const href = `${base}${toHref(slug)}`
    return {
      ...metadata,
      href,
      date: dayjs(date),
      children: children.map(augmentMetadata)
    }
  }

  export const load: Load = async ({ page: { path }, fetch }) => {
    const response = await loadPageMetadata(`${base}${path}`, fetch)
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
  import PageTitle from '$c/PageTitle.svelte'
  import Debug from '$c/Debug.svelte'

  export let list: PostMetadataAugmented[] = []
  export let post: PostMetadataAugmented = null
  export let isCourse = false
  export let isChapter = false
  export let md: SvelteComponent | false = false
  $: title = post?.title ?? 'Courses'
</script>

<template>
  <Debug {...{ post, list }} />
  <PageTitle {title} />
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
