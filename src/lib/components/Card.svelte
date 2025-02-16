<script lang="ts">
	type CardProps = {
		name: string;
		id: number;
		src?: string;
	};
	const { name, src, id }: CardProps = $props();
</script>

<div class="Card">
	<h1>{name}</h1>
	<img {src} alt={name} />
</div>

<style>
	.Card {
		display: flex;
		flex-flow: column;
		align-items: center;
		width: 15rem;
		margin: auto;
	}

	img {
		width: 100%;
		object-fit: cover;
		filter: grayscale(100%);
		border-radius: 12px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	}
</style>
