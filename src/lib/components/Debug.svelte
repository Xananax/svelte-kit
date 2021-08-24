<script lang="ts">
  export let open = false
  $: text = JSON.stringify($$props, null, 2)
</script>

<template lang="pug">
  details({open})
    summary received JSON
    pre 
      code(class="language-json") { text }
</template>

<style lang="stylus">
  details
    border 1px dashed black
    margin 1em
    padding 1em
  summary
    background #fdfdfd
</style>
