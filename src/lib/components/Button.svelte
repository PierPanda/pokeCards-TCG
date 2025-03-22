<script lang="ts">
	// Props du composant
	export let label: string = '';
	export let onClick: () => void;
	export let type: 'primary' | 'secondary' | 'action' | 'attack' | 'coin' | 'back' | 'restart' =
		'primary';
	export let disabled: boolean = false;
	export let tabindex: number = 0;
	export let customClass: string = '';

	// Gestion des événements clavier pour l'accessibilité
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			onClick();
		}
	}
</script>

<button
	class="button {type} {customClass}"
	on:click={onClick}
	on:keydown={handleKeydown}
	{disabled}
	{tabindex}
>
	<slot>{label}</slot>
</button>

<style>
	.button {
		border: none;
		border-radius: 25px;
		padding: 0.75rem 1.5rem;
		font-weight: bold;
		cursor: pointer;
		transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
		position: relative;
		overflow: hidden;
		display: inline-block;
		text-align: center;
	}

	.button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.primary {
		background: linear-gradient(145deg, #2a75bb, #3a85cb);
		color: white;
	}

	.primary:hover:not(:disabled) {
		background: linear-gradient(145deg, #1a65ab, #2a75bb);
		transform: translateY(-3px) scale(1.05);
		box-shadow: 0 8px 20px rgba(42, 117, 187, 0.3);
	}

	.secondary {
		background: linear-gradient(145deg, #6c757d, #5a6268);
		color: white;
	}

	.secondary:hover:not(:disabled) {
		background: linear-gradient(145deg, #5a6268, #495057);
		transform: translateY(-3px) scale(1.05);
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
	}

	.action {
		background: linear-gradient(145deg, #ffcb05, #ffd740);
		color: #2a75bb;
	}

	.action:hover:not(:disabled) {
		background: linear-gradient(145deg, #f0bb00, #ebc030);
		transform: translateY(-3px) scale(1.05);
		box-shadow: 0 8px 20px rgba(255, 203, 5, 0.3);
	}

	.attack {
		display: block;
		width: 100%;
		margin: 10px 0;
		text-align: left;
		padding: 15px 20px;
		border-radius: 15px;
		background: linear-gradient(145deg, #ffcb05, #ffd740);
		color: #2a75bb;
		position: relative;
	}

	.attack::after {
		content: '→';
		position: absolute;
		right: 15px;
		top: 50%;
		transform: translateY(-50%);
		transition: transform 0.3s ease;
	}

	.attack:hover:not(:disabled)::after {
		transform: translate(5px, -50%);
	}

	.attack:hover:not(:disabled) {
		background: linear-gradient(145deg, #2a75bb, #3a85cb);
		color: white;
		transform: translateY(-3px) scale(1.02);
		box-shadow: 0 8px 20px rgba(42, 117, 187, 0.3);
	}

	.coin {
		background: linear-gradient(145deg, #ffcb05, #ffd740);
		color: #2a75bb;
		border-radius: 50px;
		padding: 1rem 2rem;
	}

	.coin:hover:not(:disabled) {
		background: linear-gradient(145deg, #2a75bb, #3a85cb);
		color: white;
		transform: translateY(-3px) scale(1.05);
		box-shadow: 0 8px 20px rgba(42, 117, 187, 0.3);
	}

	.back {
		background: linear-gradient(145deg, #6c757d, #5a6268);
		color: white;
	}

	.back:hover:not(:disabled) {
		background: linear-gradient(145deg, #5a6268, #495057);
		transform: translateY(-3px) scale(1.05);
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
	}

	.restart {
		background: linear-gradient(145deg, #ffcb05, #ffd740);
		color: #2a75bb;
	}

	.restart:hover:not(:disabled) {
		background: linear-gradient(145deg, #2a75bb, #3a85cb);
		color: white;
		transform: translateY(-3px) scale(1.05);
		box-shadow: 0 8px 20px rgba(42, 117, 187, 0.3);
	}
</style>
