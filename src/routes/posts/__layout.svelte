<script>
	import Nav from '$lib/Nav.svelte';
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.1/styles/github.min.css"
	/>
	<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Overpass" />
	<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fira+Mono" />
</svelte:head>

<div class="g-app-wrapper">
	<Nav />
	<slot />
</div>
