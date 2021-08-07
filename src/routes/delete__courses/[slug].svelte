<script context="module" lang="ts">
	export { load } from './consts';
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
