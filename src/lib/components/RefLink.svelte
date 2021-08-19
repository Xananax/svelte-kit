<script context="module" lang="ts">
  import type { PromiseValue } from 'type-fest'

  const toNormalizedPath = (path: string) => path.replace(/^(\.\.\/)+posts/, '')
  const pagePathToSlug = (path: string) =>
    path
      .replace(/(\/index)?\.(md|svx|svelte\.md)$/, '')
      .replace(/\/chapters\//, '/')
      .replace(/^\/|\/$/g, '')

  const slugToTitle = (slug: string) => slug.replace(/-|_/g, ' ')

  const process = async ([path, resolver]: [string, () => Promise<SvelteModule>]) => {
    const { metadata } = await resolver()
    if (!metadata) {
      const slug = pagePathToSlug(toNormalizedPath(path))
      const title = slugToTitle(slug)
      return { title, slug }
    }
    const { title, slug } = metadata
    return {
      title,
      slug: slug ?? pagePathToSlug(toNormalizedPath(path))
    }
  }

  type RefLinkProps = PromiseValue<ReturnType<typeof process>>
  type RefLinkDict = Record<string, RefLinkProps>

  const modules = Promise.all(
    Object.entries(import.meta.glob(`../../posts/**/*.{md,svx,svelte.md}`)).map(process)
  ).then((elements) =>
    elements.reduce((dict, mod) => {
      if (mod) {
        dict[mod.slug] = mod
      }
      return dict
    }, {} as RefLinkDict)
  )

  const getModuleTitle = async (slug: string, def: string) => {
    const routes = {} //await modules
    return routes[slug] ?? def
  }
</script>

<script lang="ts">
  export let slug: string
  $: href = `/courses/${slug}`
  const defaultName = slugToTitle(slug)
  const getName = async () => $$slots.default ?? (await getModuleTitle(slug, defaultName))
  let name = getName()
</script>

<template>
  <a sveltekit:prefetch {href}>
    <slot>
      {#await name}
        {defaultName}
      {:then name}
        {name}
      {:catch error}
        {defaultName}
      {/await}
    </slot>
  </a>
</template>
