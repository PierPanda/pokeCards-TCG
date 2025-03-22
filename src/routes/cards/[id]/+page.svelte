<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	const { data } = $props();
	const { name, id, isInCollection } = data;
	const image = data.images.large;
</script>

<main>
	<Card {name} {id} src={image} {isInCollection} />
</main>

<style>
	main {
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		justify-self: center;
		align-items: center;
		padding: 20px;
		text-align: center;
		object-fit: cover;
		object-position: center;
	}
</style>
