<script context="module" lang="ts">
  import Logo from '$c/Logo.svelte'
  import PageTitle from '$c/PageTitle.svelte'
  export const prerender = true
</script>

<template lang="pug">
  PageTitle(title="Home")
  section
    .logo
      Logo(fill="#050505")
    h1 welcome to your new SvelteKit app
    h2 try editing src/routes/index.svelte

    p
      a(href="/profile") log in
</template>

<style lang="stylus">
  .logo
    width 100%
  section, .logo
    display flex
    flex-direction column
    justify-content center
    align-items center
    flex 1

  h1
    width 100%

</style>
