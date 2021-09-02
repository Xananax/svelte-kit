<script lang="ts">
  export let href = ''
  export let button = false
  export let tall = false
</script>

<template>
  <a class:button class:tall {href}><slot /></a>
</template>

<style lang="stylus">
  .button
    background-color #ffdd2e
    text-shadow none
    box-shadow 0 4px 6px rgba(0,0,0,.12),0 2px 4px rgba(0,0,0,.1)
    font-size large
    color #272b30
    display: inline-block;
    border-radius: 8px;
    padding: .5rem 1.5rem;
    line-height: normal;
    font-weight: 700;
    text-transform: uppercase;
    text-align: center;
    border: none;
    text-decoration: none;
  .tall
    padding-top 1rem
    padding-bottom 1rem
</style>
