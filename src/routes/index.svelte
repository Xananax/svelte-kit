<script context="module" lang="ts">
  import { title } from '$lib/env'
  export const prerender = true
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<template lang="pug">
  section
    h1
      .welcome
        picture
          source(srcset="svelte-welcome.webp" type="image/webp")
          img(img src="svelte-welcome.png" alt="Welcome")
      span to your new <br/>SvelteKit app
    h2 try editing src/routes/index.svelte
</template>

<style lang="stylus">
  section
    display flex
    flex-direction column
    justify-content center
    align-items center
    flex 1

  h1
    width 100%

  .welcome
    position relative
    width 100%
    height 0
    padding 0 0 calc(100% * 495 / 2048) 0
    img
      position absolute
      width 100%
      height 100%
      top 0
      display block
</style>
