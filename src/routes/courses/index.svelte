<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'
  import type { MetadataResponse } from './api.json'
  import { strip } from '$lib/path'
  import { augmentMetadata } from '$lib/metadata'
  import { base } from '$app/paths'

  export const load: Load = async ({ url: { pathname }, fetch, session: { user } }) => {
    const apiURL = `${pathname}/api.json`
    console.log({ apiURL })
    const { data }: MetadataResponse = await (await fetch(apiURL)).json()
    const list = data.map(augmentMetadata)

    return { props: { list } }
  }
</script>

<script lang="ts">
  import Title from '$c/Title.svelte'
  import Debug from '$c/Debug.svelte'
  export let list: PostMetadataAugmented[] = null
</script>

<template>
  <Debug {...{ list }} />
  <Title title="Courses" />
  <ul>
    {#each list as { title, href, description, author, date, slug, price } (slug)}
      <li>
        <Link {href}>{slug}</Link>
        {#if price}
          - <Link href="{base}/checkout/{slug}">buy</Link>
        {/if}
      </li>
    {/each}
    <slot />
  </ul>
</template>
