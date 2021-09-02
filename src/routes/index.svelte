<script context="module" lang="ts">
  import Logo from '$c/Logo.svelte'
  import Title from '$c/PageMeta/Title.svelte'
  import Link from '$c/Link.svelte'
  import Content from '$c/Content.svelte'
  import { base } from '$app/paths'
  export const prerender = true
</script>

<template lang="pug">
  Title(title="Home")
  Content(white="{false}")
    h1 Become a Game Developer with Godot
    p Learn the techniques professionals use to create stunning games, using Free and Open Source Software.
    Link(href="" button tall) Get Started For Free
  Content
    .logo
      Logo
    h1 welcome to your new SvelteKit app
    h2 try editing src/routes/index.svelte

    p
      a(href="{base}/profile") log in
  slot
</template>

<style lang="stylus">
  .logo
    width 100%
    display flex
    flex-direction column
    justify-content center
    align-items center
    flex 1
  h1
    width 100%

</style>
