<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import { getURL, url } from './consts';
	export const load: Load = async ({ fetch }) => {
		const posts: Post[] = await getURL(fetch);
		return {
			props: { posts }
		};
	};
</script>

<script lang="ts">
	export let posts: Post[];
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div>
	<h1>SvelteKit Blog</h1>
	<p class="info">{posts.length} posts.</p>
	{#each posts as { slug, metadata: { title, excerpt } }}
		<a href={`${url}/${slug}`}>
			<h2 class="title">{title}</h2>
			<p>{excerpt}</p>
		</a>
	{/each}
</div>
