<script lang="ts">
	import { onMount } from 'svelte';
	import { randomBooster } from '$lib/utils';
	import cardsData from '$lib/cards.json' with { type: 'json' };

	let allCards: { images: { large: string } }[] = [];
	let randomCards: { images: { large: string } }[] = [];

	// Vérifie si les données sont bien un tableau
	console.log('cardsData:', cardsData);

	// Charger les cartes
	onMount(() => {
		if (Array.isArray(cardsData)) {
			allCards = cardsData.map((card) => ({
				images: card.images
			}));

			console.log({ 'All Cards:': allCards }, { 'Random Cards:': randomCards });
		} else {
			console.error("cardsData n'est pas un tableau", cardsData);
		}
	});

	// Fonction pour tirer 5 cartes aléatoires
	const pickRandomCards = () => {
		randomCards = randomBooster(allCards, 5);
	};
</script>

<main>
	<button onclick={pickRandomCards}>Tirer un booster</button>

	{#if randomCards.length > 0}
		<div class="booster">
			{#each randomCards as card}
				<div class="card">
					<img src={card.images.large} alt="card" />
				</div>
			{/each}
		</div>
	{/if}
</main>

<style>
	main {
		margin: 0 auto;
		padding: 20px;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.booster {
		display: flex;
		gap: 10px;
		margin-top: 20px;
	}
	img {
		width: 90%;
		height: auto;
		border-radius: 12px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
		transition: transform 0.3s ease-out;
	}

	img:hover {
		transform: scale(1.1);
	}

	button {
		margin: auto;
		align-items: center;
		background-color: #fee6e3;
		border: 2px solid #111;
		border-radius: 8px;
		box-sizing: border-box;
		color: #111;
		cursor: pointer;
		display: flex;
		font-family: Inter, sans-serif;
		font-size: 16px;
		height: 48px;
		justify-content: center;
		line-height: 24px;
		max-width: 100%;
		padding: 0 25px;
		position: relative;
		text-align: center;
		text-decoration: none;
		user-select: none;
		-webkit-user-select: none;
		touch-action: manipulation;
	}

	button:after {
		background-color: #ffde00;
		border-radius: 8px;
		content: '';
		display: block;
		height: 45px;
		left: 0;
		width: 100%;
		position: absolute;
		top: -1px;
		transform: translate(7px, 7px);
		transition: transform 0.3s ease-out;
		z-index: -1;
	}

	button:hover:after {
		transform: translate(0, 0);
	}

	button:active {
		background-color: #ffdeda;
		outline: 0;
	}

	button:hover {
		outline: 0;
	}

	@media (min-width: 768px) {
		button {
			padding: 0 40px;
		}
	}
</style>
