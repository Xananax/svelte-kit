<script lang="ts">
  let count = 0
  const increment = () => (count += 1)
</script>

<template lang="pug">
  .counter
    p.count {count}
    button(on:click="{increment}") increment
</template>

<style lang="stylus">
  .counter
    text-align center
  .count
    font-size 2rem
    margin-bottom calc(var(--spacing-unit) * 2)
  .counter
    margin-top calc(var(--spacing-unit) * 4)
    margin-bottom calc(var(--spacing-unit) * 4)
</style>
