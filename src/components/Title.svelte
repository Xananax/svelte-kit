<script lang="ts">
  import { title } from '$config/socialMedia'

  let additional = ''
  export { additional as title }
  $: text = additional ? `${additional} | ${title}` : title
</script>

<svelte:head>
  <title>{text}</title>
  <meta property="og:title" content={text} />
</svelte:head>
