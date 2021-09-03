<script lang="ts">
  import { title } from '$lib/config/siteConfig'

  let additional = ''
  export { additional as title }
  $: text = additional ? `${additional} | ${title}` : title
</script>

<svelte:head>
  <title>{text}</title>
  <meta property="og:title" content={text} />
</svelte:head>
