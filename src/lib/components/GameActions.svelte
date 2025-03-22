<script lang="ts">
	import Button from './Button.svelte';

	export let gameOver: boolean = false;
	export let onBackToSelection: () => void;
	export let onStartCombat: () => void;
	export let onRestartGame: () => void;
</script>

<div class="action-container">
	<Button type="back" onClick={onBackToSelection} label="Quitter" />
	{#if gameOver}
		<Button type="restart" onClick={onRestartGame} label="Nouvelle partie" />
	{/if}
</div>

<style>
	.action-container {
		display: flex;
		justify-content: center;
		gap: 20px;
		margin-top: 30px;
		padding: 15px;
	}
</style>
