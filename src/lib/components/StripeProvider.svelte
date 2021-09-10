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

  const publishableKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY

  // TODO: Use a store rather than context?
  setContext('stripe', { getStripe: async () => stripe })

  let stripe = loadStripe(publishableKey)
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
