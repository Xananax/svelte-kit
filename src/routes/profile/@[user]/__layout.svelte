<script context="module" lang="ts">
  import { StatusCodes } from 'http-status-codes'
  import type { Load } from '@sveltejs/kit'
  import { base } from '$app/paths'

  export const load: Load = async ({ session: { user } }) => {
    if (!user) {
      return { redirect: `${base}/profile/unauthorized`, status: StatusCodes.MOVED_TEMPORARILY }
    }
    return {}
  }
</script>

<slot />
