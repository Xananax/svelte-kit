<script lang="ts">
  export let slug: string
  export let title: string
  export let href: string
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
