<script context="module" lang="ts">
  import { unpackClientModules, reducePagesToRef, extractMetadataFromModules } from '$lib/metadata'

  const normalizePath = (path: string) => path.replace(/^(\.\.\/)+routes\/courses\//, '')

  const unprocessedPages = Object.entries(
    import.meta.glob<SvelteModule>('../../routes/courses/**/index.{md,svx,svelte.md}')
  )

  const pages = unpackClientModules(unprocessedPages)
    .then(extractMetadataFromModules)
    .then(reducePagesToRef)

  const slugToTitle = (slug: string) => slug?.replace(/-|_/g, ' ')

  const getTitle = async (slug: string, defaultName: string) => {
    return (await pages)[slug] ?? defaultName
  }
</script>

<script lang="ts">
  import { browser, dev } from '$app/env'

  export let slug = ''

  let error = false

  if (!slug && browser && dev) {
    console.warn('Reference Link was not given a slug')
    error = true
  }

  $: href = slug //toHref(slug)
  $: defaultTitle = slugToTitle(slug)
  let title = $$slots.default ?? getTitle(slug, defaultTitle)
</script>

<template>
  <a sveltekit:prefetch {href} class:error>
    <slot>
      {#await title}
        {defaultTitle}
      {:then name}
        {name}
      {/await}
    </slot>
  </a>
</template>

<style lang="stylus">
  .error
    background red
    &::after, &::before
      content: ' ERROR '
</style>
