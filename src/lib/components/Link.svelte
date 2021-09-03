<script lang="ts">
  import { base } from '$app/paths'

  export let url = ''
  export let button = false
  export let tall = false
  export let social = false
  export let disabled: boolean = undefined
  export let download: true = undefined
  export let prefetch: true = undefined
  export let active: true = undefined
  let additionalRel = ''
  let providedTarget: string = undefined
  let providedTabIndex: number = undefined
  let className: string = undefined

  export {
    additionalRel as rel,
    providedTarget as target,
    providedTabIndex as tabIndex,
    className as class,
    url as href
  }

  const scroll = /^#/.test(url)
  const internal = scroll || /^\/(?!\/)/.test(url)
  const external = !internal
  const href = internal ? `${base}${url}` : url
  const tabIndex = disabled ? -1 : providedTabIndex
  const target = providedTarget ?? external ? '_blank' : undefined
  const rel = external
    ? social
      ? `noopener ${additionalRel}`
      : `noreferrer noopener nofollow ${additionalRel}`
    : additionalRel

  //console.log({ href, external })
</script>

<template>
  <a
    class:button
    class:tall
    class:disabled
    class:active
    class={className}
    {href}
    sveltekit:prefetch={prefetch}
    {target}
    {rel}
    {disabled}
    {tabIndex}
    {download}><slot /></a
  >
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
  .disabled
    pointer-events none
    cursor pointer
    opacity 0.7
  .tall
    padding-top 1rem
    padding-bottom 1rem
</style>
