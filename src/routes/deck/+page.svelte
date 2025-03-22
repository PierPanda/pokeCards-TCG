<script>
	import pokemonCards from '$lib/cards.json';
	export let data;
	const { collection } = data;
</script>

<main>
	<h1>Mes cartes</h1>

	<div class="stats">
		<div class="stat-card">
			<h3>Nombre de cartes</h3>
			<p>{collection.length} / {pokemonCards.length}</p>
		</div>
	</div>

	{#if collection.length === 0}
		<div class="empty-collection">
			<p>
				Ta collection est vide. Ouvre un booster sur la page d'accueil pour obtenir des cartes !
			</p>
			<a href="/">Ouvrez un booster</a>
		</div>
	{:else}
		<div class="cards-grid">
			{#each collection as card}
				<div class="card">
					<a href="/cards/{card.id}">
						<img src={card.images.small} alt={card.name} />
						<div class="card-name">{card.name}</div>
					</a>
				</div>
			{/each}
		</div>
	{/if}
</main>

<style>
	main {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
	}

	h1 {
		font-size: 2.5rem;
		color: #ffcc00;
		text-align: center;
		margin-bottom: 2rem;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
	}

	a {
		color: #ffcc00;
		text-decoration: none;
		font-weight: bold;
	}

	.stats {
		display: flex;
		justify-content: center;
		margin-bottom: 2rem;
	}

	.stat-card {
		background: linear-gradient(135deg, #cc0000, #ff3333);
		color: white;
		border-radius: 10px;
		padding: 1.5rem;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
		text-align: center;
		min-width: 200px;
	}

	.stat-card h3 {
		margin: 0 0 0.5rem 0;
		font-size: 1.2rem;
	}

	.stat-card p {
		font-size: 2rem;
		font-weight: bold;
		margin: 0;
	}

	.empty-collection {
		background-color: rgba(255, 255, 255, 0.1);
		border-radius: 10px;
		padding: 2rem;
		text-align: center;
		color: white;
		margin-top: 2rem;
	}

	.cards-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 2rem;
		margin-top: 2rem;
	}

	.card {
		background-color: rgba(255, 255, 255, 0.1);
		border-radius: 10px;
		overflow: hidden;
		transition: transform 0.3s ease;
	}

	.card:hover {
		transform: translateY(-10px);
	}

	.card a {
		text-decoration: none;
		color: inherit;
	}

	.card img {
		width: 100%;
		height: auto;
		display: block;
	}

	.card-name {
		padding: 1rem;
		text-align: center;
		color: white;
		font-weight: bold;
	}
</style>
