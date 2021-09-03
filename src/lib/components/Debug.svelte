<script lang="ts">
  /**
   * A component that stringifies anything passed to it and outputs it as JSON in the doc
   */
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
