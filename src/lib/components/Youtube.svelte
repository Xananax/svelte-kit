<script context="module" lang="ts">
  declare global {
    interface Window {
      onYouTubeIframeAPIReady: () => void
    }
  }
  let YouTubeIframeAPIReady = false
  import { appendScriptIfNotLoaded } from '$lib/appendScriptURL'
  if (appendScriptIfNotLoaded('https://www.youtube.com/iframe_api')) {
    window.onYouTubeIframeAPIReady = () => {
      YouTubeIframeAPIReady = true
      window.dispatchEvent(new Event('YouTubeIframeAPIReady'))
    }
  }
</script>

<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'
  import { v4 as uuid } from '@lukeed/uuid'
  export let videoId: string

  let player: YT.Player
  let height = 390
  let width = 640
  let responsive = true
  let id = `player_${videoId}_${uuid()}`

  const dispatch = createEventDispatcher()

  export const play = () => player.playVideo()

  export const getCurrentTime = () => player.getCurrentTime()

  const createPlayer = () => {
    player = new YT.Player(id, {
      height,
      width,
      videoId,
      host: 'http://www.youtube-nocookie.com',
      playerVars: { rel: 0 },
      events: {
        onReady: () => {
          dispatch('ready')
        },
        onStateChange: ({ data }) => dispatch('stateChange', data)
      }
    })
  }

  onMount(() => {
    if (YouTubeIframeAPIReady) {
      createPlayer()
    } else {
      window.addEventListener('YouTubeIframeAPIReady', createPlayer)
    }
  })
</script>

<template lang="pug">
  .youtube(class:responsive)
    .youtube-player({id})
</template>

<style lang="stylus">
  .responsive
    position relative
    overflow hidden
    padding-top 56.25%
    & .youtube-player
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      border 0
</style>
