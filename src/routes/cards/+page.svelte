<script>
	export let data;
	const { pokemonCards } = data;
	console.log('Cards with collection status:', pokemonCards);
</script>

<main>
	<h1>Cartes Pokémon</h1>

	<ul>
		{#each pokemonCards as card}
			<li>
				<a href="/cards/{card.id}">
					<div class="card-container" class:owned-container={card.isInCollection}>
						<img src={card.images.small} alt={card.name} class:owned={card.isInCollection} />
					</div>
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

	.card-container {
		position: relative;
		transition: transform 0.3s ease;
	}

	.card-container:hover {
		transform: scale(1.05);
	}

	.owned-container {
		box-shadow: 0 0 15px 5px #ffde00;
		border-radius: 10px;
	}

	li img {
		width: 100%;
		object-fit: cover;
		border-radius: 10px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
		transition: filter 0.3s ease;
		filter: grayscale(100%);
	}

	.owned {
		filter: grayscale(0%) !important;
	}
</style>
