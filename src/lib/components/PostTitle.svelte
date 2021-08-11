<script lang="ts">
  export let slug: PostMetadataAugmented['slug']
  export let title: PostMetadataAugmented['title']
  export let href: PostMetadataAugmented['href']
  const id = slug
</script>

<h3 class="heading" {id}>
  <a {href}>
    {title}
  </a>
</h3>

<style>
  .heading {
    margin: 0;
    font-size: 1.8rem;
  }
</style>
