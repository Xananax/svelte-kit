<script context="module" lang="ts">
  import { makeModuleLoader } from '$lib/makeModuleLoader'
  import { loadPostMetadata } from '$lib/loadPostMetadata'
  import { basename } from '$lib/path'

  export const slugFromPath = (path: string) => basename(path.replace('/index.md', ''))
  const load = loadPostMetadata(slugFromPath)
  const getModules = makeModuleLoader(
    import.meta.glob(`../../routes/posts/*/index.{md,svx,svelte.md}`),
    load
  )
  const getModule = async (slug: string) => {
    await getModules()
    return getModules.dict[slug].title
  }
</script>

<script lang="ts">
  export let ref: string
  $: href = `/posts/${ref}`
  $: defaultName = ref.replace(/-|_/g, ' ')
  const getName = async () => (await getModule(ref)) ?? defaultName
  let name = $$slots.default ? '' : getName()
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
