<script lang="ts">
  import { title } from '$lib/config/siteConfig'

  export let description: string
</script>

<svelte:head>
  <meta property="og:site_name" content={title} />
  <meta property="og:description" content={description} />
</svelte:head>
