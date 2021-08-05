<script context="module" lang="ts">
	import type { Load, LoadInput } from '@sveltejs/kit';
	import { getURL } from './consts';

	export const load: Load<LoadInput<PostLocals>> = async ({ page, fetch }) => {
		const { slug } = page.params;
		const post: Post = await getURL(fetch, slug);
		return {
			props: { post }
		};
	};
</script>

<script lang="ts">
	export let post: Post;
	let date = post.metadata.date.toUpperCase();
	let title = post.metadata.title;
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<h1 class="title">{title}</h1>
<p class="info">{date}</p>
{@html post.content}
