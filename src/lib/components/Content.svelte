<script lang="ts">
  let className: string = ''
  export { className as class }

  export let white = true
  export let backgroundColor = ''
  $: style = backgroundColor ? `background-color: ${backgroundColor}` : ''
</script>

<template>
  <section class={className} class:white {style}>
    <div>
      <slot />
    </div>
  </section>
</template>

<style lang="stylus">
  section
    min-width 100%
    flex 1
    display flex
    flex-direction column
    padding 1rem
    width 100%
    margin 0 auto
    box-sizing border-box
  .white
    background-color #fff
    :global(*)
      color #222
  div
    flex 1
    display flex
    flex-direction column
    padding 1rem
    width 100%
    margin 0 auto
    box-sizing border-box
    max-width var(--column-width)
    margin var(--column-margin-top) auto 0 auto
</style>
