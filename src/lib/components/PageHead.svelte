<script lang="ts">
  export let title: string
  export let description: string

  const siteTitle = 'GDQuest'
  const formattedTitle = title ? `${title} | ${siteTitle}` : siteTitle
</script>

<svelte:head>
  <title>{formattedTitle}</title>

  <meta property="og:site_name" content={siteTitle} />
  <meta property="og:title" content={formattedTitle} />
  <meta property="og:description" content={description} />
</svelte:head>
