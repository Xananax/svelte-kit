<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'
  import { toAPIPath } from './api/_consts'
  import type { Response } from './api/[...slug]/index'

  export const load: Load = async ({ page: { path }, fetch }) => {
    const { isList, data }: Response = await (await fetch(toAPIPath(path))).json()
    const md = !isList ? (await import(`../posts/${(data as PostMetadata).path}`)).default : null
    return {
      props: {
        post: data,
        md
      }
    }
  }
</script>

<script lang="ts">
  export let post: PostMetadataAugmented = null
  export let md: SvelteModule
  $: text = JSON.stringify(post, null, 2)
</script>

<template lang="pug">
  code 
    pre {text}
  slot
    md
</template>
