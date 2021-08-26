<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'

  export const load: Load = async ({ session: { user } }) => {
    if (!user) {
      return { redirect: '/profile/unauthorized', status: 302 }
    }
    return {}
  }
</script>

<slot />
