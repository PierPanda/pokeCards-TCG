<script lang="ts">
	import { onMount } from 'svelte';
	import { randomBooster } from '$lib/utils';
	import cardsData from '$lib/cards.json' with { type: 'json' };
	import type { PokemonCard } from '$lib/types/cards';

	let allCards: PokemonCard[] = [];
	let randomCards: PokemonCard[] = [];
	let saveStatus = '';

	onMount(() => {
		if (Array.isArray(cardsData)) {
			allCards = cardsData;
			console.log({ 'All Cards:': allCards }, { 'Random Cards:': randomCards });
		} else {
			console.error("cardsData n'est pas un tableau", cardsData);
		}
	});

	const pickRandomCards = () => {
		randomCards = randomBooster(allCards, 5);
	};

	const saveToCollection = async () => {
		try {
			const response = await fetch('/api/collection', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(randomCards)
			});

			if (response.ok) {
				saveStatus = 'Cartes sauvegardées avec succès !';
				setTimeout(() => {
					saveStatus = '';
				}, 3000);
			} else {
				throw new Error('Erreur lors de la sauvegarde');
			}
		} catch (error) {
			console.error('Erreur:', error);
			saveStatus = 'Erreur lors de la sauvegarde des cartes';
		}
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
		<div class="actions">
			<button onclick={saveToCollection} class="save-btn">Save</button>
			<button onclick={() => (randomCards = [])} class="clear-btn">Clear</button>
		</div>
		{#if saveStatus}
			<div class="status-message">{saveStatus}</div>
		{/if}
	{/if}
</main>

<style>
	main {
		padding: 20px;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 3rem;
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

	.actions {
		display: flex;
		gap: 1rem;
		margin-top: 1rem;
	}

	.status-message {
		margin-top: 1rem;
		padding: 0.5rem;
		border-radius: 4px;
		background-color: #4caf50;
		color: white;
		text-align: center;
	}
</style>
