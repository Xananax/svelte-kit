<script context="module" lang="ts">
  export const prerender = true

  export async function load({ fetch }) {
    const res = await fetch('/products.json')
    const products: Product[] = await res.json()
    return {
      status: 200,
      props: {
        products
      }
    }
  }
</script>

<script lang="ts">
  import Content from '$c/Content.svelte'
  import ProductsChoice from '$c/ProductsChoice.svelte'
  import StripeProvider from '$c/StripeProvider.svelte'
  export let products: Product[]
</script>

<template>
  <StripeProvider>
    <Content white={false}>
      <ProductsChoice {products} />
    </Content>
  </StripeProvider>
</template>
