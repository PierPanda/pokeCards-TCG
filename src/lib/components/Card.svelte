<script lang="ts">
	import { onMount } from 'svelte';

	type CardProps = {
		name: string;
		id: number;
		src?: string;
		isInCollection?: boolean;
	};
	const { name, src, id, isInCollection = false }: CardProps = $props();

	let card: HTMLElement;
	let isHovering = $state(false);

	let cardTransform = $state('perspective(1000px) rotateY(0) rotateX(0) scale3d(1, 1, 1)');

	onMount(() => {
		if (isInCollection && card) {
			card.addEventListener('mousemove', handleMouseMove);
			card.addEventListener('mouseenter', () => {
				isHovering = true;
			});
			card.addEventListener('mouseleave', () => {
				isHovering = false;
				resetStyles();
			});
		}
	});

	function handleMouseMove(e: MouseEvent) {
		if (!isInCollection || !isHovering) return;

		const rect = card.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;
		const posX = e.clientX - centerX;
		const posY = e.clientY - centerY;

		const rotateY = (posX / rect.width) * 20;
		const rotateX = (posY / rect.height) * -20;

		cardTransform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale3d(1.05, 1.05, 1.05)`;
	}

	function resetStyles() {
		cardTransform = 'perspective(1000px) rotateY(0) rotateX(0) scale3d(1, 1, 1)';
	}
</script>

<div
	class="Card"
	class:card-owned={isInCollection}
	bind:this={card}
	style:transform={cardTransform}
>
	<h1>{name}</h1>
	<div class="card-container">
		<img {src} alt={name} class:owned={isInCollection} />
	</div>
</div>

<style>
	.Card {
		display: flex;
		flex-flow: column;
		align-items: center;
		width: 15rem;
		margin: auto;
	}

	.card-container {
		position: relative;
		width: 100%;
		border-radius: 12px;
		overflow: hidden;
	}

	img {
		width: 100%;
		object-fit: cover;
		filter: grayscale(100%);
		border-radius: 12px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
		transition: filter 0.3s ease;
	}

	.owned {
		filter: grayscale(0%) !important;
	}

	.card-owned {
		transition: transform 0.1s ease;
		transform-style: preserve-3d;
	}
</style>
