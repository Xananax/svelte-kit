<script context="module" lang="ts">
  import { loadPostList } from '$lib/loadPostList'
  const getModules = loadPostList(import.meta.glob(`../../routes/posts/*/index.{md,svx,svelte.md}`))
  const getModule = async (slug: string) => (await getModules()).dict[slug]?.title
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
