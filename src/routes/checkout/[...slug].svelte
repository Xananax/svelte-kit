<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'
  import type { MetadataResponse } from '../courses/api.json'
  import { strip } from '$lib/path'
  import { augmentMetadata } from '$lib/metadata'
  import { base } from '$app/paths'
  import { StatusCodes } from 'http-status-codes'

  export const load: Load = async ({ params: { slug }, fetch, session: { user } }) => {
    if (!slug) {
      return { status: StatusCodes.NOT_FOUND }
    }
    const apiUrl = `${base}/checkout/${slug}.json`

    const params: StripeCreateParams = await (await fetch(apiUrl)).json()
    console.log('FRONT END', { params })
    return { props: { params } }
  }
</script>

<script lang="ts">
  import Title from '$c/Title.svelte'
  import Debug from '$c/Debug.svelte'
  import type { StripeCreateParams } from './api.json'
  export let params: StripeCreateParams = null
  const slug = params.product.metadata.slug
  const title = params.product.metadata.title
  const description = params.product.metadata.description
  const url = `${base}/checkout/buy?${new URLSearchParams({ slug }).toString()}`
</script>

<template lang="pug">
  Title(title="asdasd")
  p {description}
  Link(href="{url}") buy now
</template>
