<script context="module">
	import { base } from '$app/paths';

	const path = `${base}/posts.json`;
	export async function load({ fetch }) {
		const posts = await fetch(path).then((r) => r.json());
		return {
			props: { posts }
		};
	}
</script>

<script>
	export let posts;
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div>
	<h1>SvelteKit Blog</h1>
	<p class="info">{posts.length} posts.</p>
	{#each posts as post}
		<a href={`${base}/posts/${post.slug}`}>
			<h2 class="title">{post.metadata.title}</h2>
			<p>{post.metadata.excerpt}</p>
		</a>
	{/each}
</div>
