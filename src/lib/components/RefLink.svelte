<script context="module" lang="ts">
  import { makeMetadata } from '$lib/metadataHelpers'
  import { toHref, toSlug, slugToTitle } from '../../routes/courses/_utils'

  const toNormalizedPath = (path: string) => path.replace(/^(\.\.\/)+routes\/courses\//, '')

  const unprocessedPages = Object.entries(
    import.meta.glob('../../routes/courses/**/index.{md,svx,svelte.md}')
  )

  const pages = Promise.all(
    unprocessedPages.map(async ([path, resolver]) => {
      const { metadata } = await resolver()
      if (!metadata) {
        return ['', '']
      }
      const { slug, title } = makeMetadata({ path, metadata, toNormalizedPath, toHref, toSlug })
      return [slug, title]
    })
  ).then((pages) =>
    pages.filter(Boolean).reduce((obj, [slug, title]) => {
      obj[slug] = title
      return obj
    }, {} as Record<string, string>)
  )

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

  $: href = toHref(slug)
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
