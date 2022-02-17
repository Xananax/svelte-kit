<script context="module" lang="ts">
  import { StatusCodes } from 'http-status-codes'
  import type { Load } from '@sveltejs/kit'
  import { base } from '$app/paths'

  export const load: Load = ({ session: { user } }) => {
    return {
      status: StatusCodes.MOVED_TEMPORARILY,
      redirect: user ? `${base}/profile/@${user}` : `${base}/profile/login`
    }
  }
</script>
