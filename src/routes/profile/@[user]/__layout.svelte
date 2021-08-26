<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'
  import { base } from '$app/paths'

  export const load: Load = async ({ session: { user } }) => {
    if (!user) {
      return { redirect: `${base}/profile/unauthorized`, status: 302 }
    }
    return {}
  }
</script>

<slot />
