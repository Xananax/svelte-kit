# Style

Use the prettier and eslint configurations provided. If you use VSCode, there's a configuration for applying them on save automatically. If not, use `npm run check:lint` to verify linting and `npm run format` to format all files.


## Svelte Files

Always in this order:

```html
<script context="module" lang="ts">
</script>
<script lang="ts">
  import "statements first";

  const someConstant: Type = ""

  export let anyAttribute: Type;

  let dynamicProperty
  $: reactiveStuff

  more_typescript();
</script>

<template>
  <div class="a-class">
    <p>some html</p>
  </div>
</template>

<style lang="stylus">
  .a-class
    p
      background red
      margin 10px
</style>
```

Feel free to use stylus, sass, less, or just plain css.

For the `<template>` tag, [pug](https://pugjs.org) is available. You can use it like so:

```pug
<template lang="pug">
  .a-class 
    p some html
</template>
```

Prefer Pug in all circumstances, _except_ if you need to use `{#if}{:else}{/if}`, or generally need to use logic, because svelte-preprocessor makes that syntax [pretty confusing](https://github.com/sveltejs/svelte-preprocess/blob/main/docs/preprocessing.md#pug).