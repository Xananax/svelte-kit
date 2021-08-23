<script>
  $: text = JSON.stringify($$props, null, 2)
</script>

<template>
  <details>
    <summary>received JSON</summary>
    <code>
      <pre>
              { text }
          </pre>
    </code>
  </details>
</template>
