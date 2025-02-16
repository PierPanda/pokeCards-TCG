<script>
	export let data;
	const { pokemonCards } = data;
	console.log(pokemonCards);
</script>

<main>
	<h1>Cartes Pokémon</h1>
	<ul>
		{#each pokemonCards as card}
			<li>
				<a href="/cards/{card.id}">
					<img src={card.images.small} alt={card.name} />
				</a>
			</li>
		{/each}
	</ul>
</main>

<style>
	:global(body) {
		background-color: #3b4cca;
	}
	main {
		max-width: 90vw;
		margin: 0 auto;
		padding: 20px;
		text-align: center;
	}

	h1 {
		font-size: 2rem;
		color: #ffcc00;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
	}

	ul {
		list-style: none;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: 5rem;
	}

	li img:hover {
		transform: scale(1.05);
	}

	img {
		width: 100%;
		object-fit: cover;
		border-radius: 10px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
		transition: transform 0.3s ease;
		filter: grayscale(100%);
	}
</style>
