<script lang="ts">
	import Button from './Button.svelte';

	export let winner: string;
	export let onRestart: () => void;
</script>

<div class="game-over fade-in">
	<div class="winner-message">
		{#if winner === 'player'}
			Félicitations ! Vous avez gagné !
		{:else}
			Dommage ! Vous avez perdu.
		{/if}
	</div>
	<Button type="restart" onClick={onRestart} label="Nouvelle partie" />
</div>

<style>
	.game-over {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.8);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: white;
		border-radius: 15px;
		z-index: 10;
		animation: fadeIn 0.8s ease-in;
		backdrop-filter: blur(5px);
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.winner-message {
		font-size: 2.5rem;
		margin-bottom: 30px;
		text-align: center;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
	}

	.fade-in {
		animation: fadeIn 0.5s ease;
	}
</style>
