<script lang="ts">
	import Button from './Button.svelte';
	import type { ProcessedPokemonCard } from '$lib/server/fight';
	import { flipCoin as serverFlipCoin } from '$lib/server/fight';

	export let currentTurn: string;
	export let coinFlipActive: boolean;
	export let canAttack: boolean;
	export let selectedCard: ProcessedPokemonCard | null;
	export let gameOver: boolean;
	export let isFlipping: boolean;

	// Fonctions à exposer aux composants parents
	export let onFlipCoin: () => void;
	export let onSelectAttack: (attack: any) => void;
	export let onPlayerDefenseCoinFlip: () => void;
</script>

<div class="game-controls">
	{#if currentTurn === 'player' && !gameOver}
		{#if coinFlipActive}
			<div class="coin-flip-container fade-in">
				<p>Lancez la pièce pour voir si vous pouvez attaquer</p>
				<Button type="coin" onClick={onFlipCoin} disabled={isFlipping} label="Lancer la pièce" />
			</div>
		{:else if canAttack}
			<div class="attacks-container fade-in">
				<p>Choisissez une attaque:</p>
				{#if selectedCard && selectedCard.attacks && selectedCard.attacks.length > 0}
					{#each selectedCard.attacks as attack}
						<Button
							type="attack"
							onClick={() => onSelectAttack(attack)}
							label="{attack.name} ({attack.damage || '?'})"
						/>
					{/each}
				{/if}
			</div>
		{/if}
	{:else if currentTurn === 'player-defense' && !gameOver}
		<div class="coin-flip-container fade-in">
			<p>Lancez la pièce pour essayer de parer l'attaque de l'adversaire</p>
			<Button
				type="coin"
				onClick={onPlayerDefenseCoinFlip}
				disabled={isFlipping}
				label="Lancer la pièce"
			/>
		</div>
	{:else if currentTurn === 'opponent' && !gameOver}
		<div class="waiting-container fade-in">
			<p>L'adversaire réfléchit...</p>
		</div>
	{/if}
</div>

<style>
	.game-controls {
		width: 100%;
		margin-top: 25px;
		display: flex;
		flex-direction: column;
		align-items: center;
		transition: all 0.3s ease;
	}

	.coin-flip-container,
	.attacks-container,
	.waiting-container {
		margin-top: 20px;
		margin: auto;
		padding: 20px;
		border-radius: 12px;
		background-color: rgba(255, 255, 255, 0.95);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
		border: 1px solid rgba(0, 0, 0, 0.03);
		width: 100%;
		transition: all 0.3s ease;
		transform-origin: center;
		animation: slideIn 0.4s ease forwards;
	}

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.fade-in {
		animation: fadeIn 0.5s ease;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	p {
		text-align: center;
		margin-bottom: 15px;
	}
</style>
