<script lang="ts">
  export let type: 'note' | 'tips' | 'example' | 'warning' = 'note'
</script>

<template lang="pug">
  aside(class="{type}")
    slot
</template>

<style lang="stylus">
  .note, .tips, .example, .warning
    display block
    padding 0 1rem
    padding-bottom 0px
    padding-bottom 1rem
    border-radius 8px
    margin 16px 0
    &:before
      display: block;
      margin: 0 -1rem 10px;
      padding-left: 1rem;
      border-radius: 8px 8px 0 0;
      font-style: bold;
      color: #fff;
  .note
    border 1px #26bfe3 solid
    &:before
      content: "Note";
      padding-top: 4px;
      padding-bottom: 4px;
      background-color: #26bfe3;
</style>
