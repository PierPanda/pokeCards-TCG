<script lang="ts">
	export let message: string = '';
	export let type: 'player' | 'opponent' | 'system' = 'system';
</script>

{#if message}
	<div class="game-log">
		<div class="log-message {type}">{message}</div>
	</div>
{/if}

<style>
	.game-log {
		min-height: 60px;
		margin: 15px auto;
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.log-message {
		font-size: 0.95rem;
		padding: 12px 18px;
		border-radius: 10px;
		text-align: center;
		width: 100%;
		animation: fadeIn 0.5s ease;
		box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
		font-weight: 500;
		letter-spacing: 0.2px;
	}

	.log-message.player {
		background-color: rgba(42, 117, 187, 0.1);
		border-left: 5px solid #2a75bb;
		color: #2a75bb;
	}

	.log-message.opponent {
		background-color: rgba(255, 203, 5, 0.1);
		border-left: 5px solid #ffcb05;
		color: #946b00;
	}

	.log-message.system {
		background-color: rgba(0, 0, 0, 0.05);
		font-style: italic;
		border-left: 5px solid #6c757d;
		color: #495057;
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
</style>
