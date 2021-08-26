<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'

  const isTheUnauthorizedPage = (path: string) => /\/(.*)\/unauthorized/.test(path)

  export const load: Load = async ({ page: { path }, session: { user } }) => {
    if (!user && !isTheUnauthorizedPage(path)) {
      return { redirect: '/profile/unauthorized', status: 302 }
    }
    return {}
  }
</script>

<slot />
