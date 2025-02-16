<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import { CardResumeModel } from '@tcgdex/sdk';
	const { data } = $props();
	const { name, id } = data;
	const image = data.images.large;
	console.log(image);
</script>

<main>
	<Card {name} {id} src={image} />
</main>

<style>
	main {
		margin: 0 auto;
		display: flex;
		justify-self: center;
		align-items: center;
		padding: 20px;
		text-align: center;
		object-fit: cover;
		object-position: center;
	}
</style>
