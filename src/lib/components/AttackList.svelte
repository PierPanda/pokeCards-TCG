<script lang="ts">
	import type { ProcessedPokemonCard } from '$lib/server/fight';

	export let card: ProcessedPokemonCard;
	export let onAttackSelected: (attack: {
		name: string;
		damage: number | null;
		text?: string;
	}) => void;
</script>

<div class="attacks-container fade-in">
	<p>Choisissez votre attaque:</p>

	{#if card.attacks && card.attacks.length > 0}
		{#each card.attacks as attack}
			<button class="attack-button" on:click={() => onAttackSelected(attack)}>
				{attack.name} ({attack.damage || '?'})
			</button>
		{/each}
	{:else}
		<p class="no-attacks">Aucune attaque disponible</p>
	{/if}
</div>

<style>
	.attacks-container {
		margin-top: 20px;
		padding: 15px;
		border-radius: 12px;
		background-color: rgba(245, 245, 245, 0.9);
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
		border: 1px solid rgba(0, 0, 0, 0.03);
		width: 100%;
		animation: fadeIn 0.4s ease-out;
	}

	.attack-button {
		display: block;
		width: 100%;
		margin: 10px 0;
		padding: 15px 20px;
		text-align: left;
		border-radius: 15px;
		background: linear-gradient(145deg, #ffcb05, #ffd740);
		color: #2a75bb;
		border: none;
		font-weight: bold;
		cursor: pointer;
		transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
		position: relative;
		overflow: hidden;
	}

	.attack-button::after {
		content: '→';
		position: absolute;
		right: 15px;
		top: 50%;
		transform: translateY(-50%);
		transition: transform 0.3s ease;
	}

	.attack-button:hover {
		background: linear-gradient(145deg, #2a75bb, #3a85cb);
		color: white;
		transform: translateY(-3px) scale(1.02);
		box-shadow: 0 8px 20px rgba(42, 117, 187, 0.3);
	}

	.attack-button:hover::after {
		transform: translate(5px, -50%);
	}

	.attack-button:active {
		transform: translateY(2px);
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	}

	.no-attacks {
		font-style: italic;
		color: #6c757d;
		text-align: center;
		margin: 20px 0;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.fade-in {
		animation: fadeIn 0.4s ease;
	}

	p {
		margin-bottom: 15px;
		font-weight: 500;
		text-align: center;
	}
</style>
