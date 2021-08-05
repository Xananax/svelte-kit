<script context="module">
	import { base } from '$app/paths';
	export async function load({ fetch }) {
		const posts = await fetch(`${base}/index.json`).then((r) => console.log(r.body + ''));
		return {
			props: { posts: fetch }
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
	{console.log(posts)}
</div>
