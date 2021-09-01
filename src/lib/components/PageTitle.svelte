<script lang="ts">
  import { title as first } from '$lib/config'
  export let title = ''
  $: text = title ? `${title} | ${first}` : title
</script>

<svelte:head>
  <title>{text}</title>
</svelte:head>
