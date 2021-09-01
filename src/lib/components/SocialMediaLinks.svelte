<script lang="ts">
  import { socialMedia } from '$lib/config'
  import SocialMediaIcon from './SocialMediaIcon.svelte'
</script>

<template lang="pug">
  .social-media
    +each('socialMedia as {name, description, href} (href)')
      a({href} target="_blank" rel="noopener")
        SocialMediaIcon(icon="{name}" class="social-media-icon") {description}
</template>

<style lang="stylus">
  .social-media
    display flex
    a
      color #fdfdfd
      &:hover
        color #ffd500
        :global(.social-media-icon)
          transition color .3s ease-in
    :global(.social-media-icon)
      transition color 1s ease-out
</style>
