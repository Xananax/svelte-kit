<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'
  import { base } from '$app/paths'
  import { modules, loadPageMetadata } from './index.json'
  import { augmentMetadata } from './_utils'

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
        //const md = modules[post.slug]
        const md = false
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
  import PostList from '$c/PostList.svelte'
  import Title from '$c/PageMeta/Title.svelte'
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
  <Title {title} />
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
        <slot />
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
        <slot />
        <svelte:component this={md} />
      </PostFull>
    {/if}
  {:else if list && list.length}
    <PostList {list}>
      <slot />
    </PostList>
  {/if}
</template>
