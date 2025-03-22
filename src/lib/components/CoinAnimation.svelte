<script lang="ts">
	export let isFlipping: boolean = false;
	export let coinResult: string | null = null;
</script>

{#if isFlipping}
	<div class="coin-animation animate">
		{coinResult || '?'}
	</div>
{/if}

<style>
	@keyframes flip {
		0% {
			transform: rotateY(0deg);
		}
		40% {
			transform: rotateY(1080deg);
		}
		50% {
			transform: rotateY(1080deg) scale(1.2);
		}
		60% {
			transform: rotateY(1080deg) scale(1);
		}
		100% {
			transform: rotateY(1080deg);
		}
	}

	.coin-animation {
		width: 100px;
		height: 100px;
		background: linear-gradient(145deg, #ffcb05, #ffd740);
		border-radius: 50%;
		margin: 25px auto;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: bold;
		color: #2a75bb;
		box-shadow: 0 5px 20px rgba(255, 203, 5, 0.5);
		z-index: 10;
		border: 4px solid rgba(255, 255, 255, 0.8);
		font-size: 1.3rem;
	}

	.coin-animation.animate {
		animation: flip 2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
	}

	@media (max-width: 768px) {
		.coin-animation {
			width: 80px;
			height: 80px;
			font-size: 1.1rem;
		}
	}
</style>
