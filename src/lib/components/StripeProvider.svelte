<script context="module" lang="ts">
  import type { Stripe } from '@stripe/stripe-js'

  export interface GetStripe {
    (): Promise<Stripe>
  }

  export interface StripeContext {
    getStripe: GetStripe
  }
</script>

<script lang="ts">
  import { loadStripe } from '@stripe/stripe-js'
  import { setContext } from 'svelte'
  import props from '$lib/config/browserEnv'
  const { stripe_public_key } = props

  // TODO: Use a store rather than context?
  setContext('stripe', { getStripe: async () => stripe })

  let stripe = loadStripe(stripe_public_key)
</script>

<template>
  {#await stripe}
    <slot name="waiting">
      <p>please wait...</p>
    </slot>
  {:then}
    <slot>
      <p>Stripe API loaded</p>
    </slot>
  {:catch}
    <slot name="error">
      <p>There was an error loading the stripe API</p>
    </slot>
  {/await}
</template>
