<script lang="ts">
	export let isFlipping: boolean = false;
	export let coinResult: string | null = null;
	export let onFlip: () => void;
	export let message: string = 'Lancez la pièce';
	export let buttonText: string = 'Lancer la pièce';
</script>

<div class="coin-flip-container fade-in">
	<p>{message}</p>

	{#if coinResult}
		<p class="result">Résultat: {coinResult.toUpperCase()}</p>
	{/if}

	<button class="coin-button" on:click={onFlip} disabled={isFlipping}>
		{buttonText}
	</button>
</div>

<style>
	.coin-flip-container {
		margin-top: 20px;
		padding: 15px;
		border-radius: 12px;
		background-color: rgba(245, 245, 245, 0.9);
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
		border: 1px solid rgba(0, 0, 0, 0.03);
		width: 100%;
		text-align: center;
		transition: all 0.3s ease;
		animation: fadeIn 0.4s ease-out;
	}

	.coin-button {
		background: linear-gradient(145deg, #ffcb05, #ffd740);
		color: #2a75bb;
		border: none;
		border-radius: 25px;
		padding: 12px 25px;
		margin: 8px;
		font-weight: bold;
		cursor: pointer;
		transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
		position: relative;
		overflow: hidden;
	}

	.coin-button::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
		border-radius: 25px;
	}

	.coin-button:hover {
		background: linear-gradient(145deg, #2a75bb, #3a85cb);
		color: white;
		transform: translateY(-3px) scale(1.05);
		box-shadow: 0 8px 20px rgba(42, 117, 187, 0.3);
	}

	.coin-button:active {
		transform: translateY(2px);
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	}

	.coin-button:disabled {
		background: #cccccc;
		color: #666666;
		cursor: not-allowed;
		transform: none;
		box-shadow: none;
	}

	.result {
		font-weight: bold;
		color: #2a75bb;
		margin: 10px 0;
		animation: fadeIn 0.3s ease;
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
	}
</style>
