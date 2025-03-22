<script lang="ts">
	import type { ProcessedPokemonCard } from '$lib/server/fight';

	export let card: ProcessedPokemonCard;
	export let hp: number;
	export let maxHp: number = card.hp;
	export let title: string = '';
	export let isAttacking: boolean = false;
	export let waitingMessage: string = '';
	export let showWaiting: boolean = false;

	function getHealthBarClass(currentHP: number, maxHP: number): string {
		const ratio = currentHP / maxHP;
		if (ratio < 0.25) return 'danger';
		if (ratio < 0.5) return 'warning';
		return '';
	}
</script>

<div class="battle-card {isAttacking ? 'attacking' : ''}">
	{#if title}
		<h3>{title}</h3>
	{/if}

	<img src={card.images.small} alt={card.name} />

	<div class="health-bar">
		<div class="health-label">HP: {hp}</div>
		<div class="health-track">
			<div
				class="health-fill {getHealthBarClass(hp, maxHp)}"
				style="width: {(hp / maxHp) * 100}%"
			></div>
		</div>
	</div>

	<h4>{card.name}</h4>

	{#if showWaiting && waitingMessage}
		<p class="waiting-text">{waitingMessage}</p>
	{/if}

	<slot></slot>
</div>

<style>
	.battle-card {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 15px;
		padding: 20px;
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
		background-color: white;
		margin-bottom: 15px;
		flex: 1;
		position: relative;
		overflow: hidden;
	}

	.battle-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 5px;
		background: linear-gradient(to right, #2a75bb, #ffcb05);
		border-radius: 5px 5px 0 0;
	}

	.battle-card img {
		max-width: 100%;
		height: auto;
		border-radius: 8px;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
		margin-bottom: 10px;
		transition: transform 0.2s ease;
	}

	.battle-card img:hover {
		transform: scale(1.03);
	}

	.health-bar {
		margin: 15px 0;
		width: 100%;
	}

	.health-label {
		font-weight: bold;
		margin-bottom: 5px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.health-track {
		height: 15px;
		background-color: #e0e0e0;
		border-radius: 10px;
		overflow: hidden;
		box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.1);
	}

	.health-fill {
		height: 100%;
		background: linear-gradient(to right, #4caf50, #8bc34a);
		transition: width 0.5s ease;
		border-radius: 10px;
	}

	.health-fill.warning {
		background: linear-gradient(to right, #ffc107, #ffeb3b);
	}

	.health-fill.danger {
		background: linear-gradient(to right, #f44336, #ff5722);
	}

	.attacking {
		animation: attack 0.5s ease;
	}

	@keyframes attack {
		0% {
			transform: translateX(0);
		}
		25% {
			transform: translateX(20px);
		}
		50% {
			transform: translateX(0);
		}
		75% {
			transform: translateX(-20px);
		}
		100% {
			transform: translateX(0);
		}
	}

	.waiting-text {
		font-style: italic;
		color: #6c757d;
		margin: 15px 0;
		font-size: 0.9rem;
	}

	h3,
	h4 {
		margin: 5px 0;
		color: #2a75bb;
	}
</style>
