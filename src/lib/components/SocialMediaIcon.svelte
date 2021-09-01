<script lang="ts">
  import youtube from 'svelte-icons/fa/FaYoutube.svelte'
  import discord from 'svelte-icons/fa/FaDiscord.svelte'
  import twitter from 'svelte-icons/fa/FaTwitter.svelte'
  import github from 'svelte-icons/fa/FaGithub.svelte'

  const icons = {
    youtube,
    discord,
    twitter,
    github
  }

  type IconName = keyof typeof icons | false

  export let icon: IconName = false
  export let className: string = ''
  export { className as class }
  $: classes = className ? `icon ${className}` : 'icon'
  $: component = (icon && icons[icon]) ?? false
</script>

<template>
  {#if icon}
    <span class={classes} aria-hidden="true">
      <svelte:component this={component} />
    </span>
    <span class="label visually-hidden">
      <slot />
    </span>
  {:else}
    <span class="label">
      <slot />
    </span>
  {/if}
</template>

<style lang="stylus">
  .icon
    color inherit
    width 32px
    height 32px
    display inline-block
  .visually-hidden
    position absolute
    overflow hidden
    clip rect(1px,1px,1px,1px)
    width 1px
    height 1px
    word-wrap normal
</style>
