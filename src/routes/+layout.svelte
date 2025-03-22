<script lang="ts">
	import { page } from '$app/state';
	const { children, data } = $props();
	const pathname = $derived(page.url.pathname);
</script>

<nav>
	<div class="nav-container">
		<ul>
			<li>
				<a href="/" class:current={pathname === '/'}> Accueil </a>
			</li>
			<li>
				<a href="/cards" class:current={pathname === '/cards'}> Cartes </a>
			</li>
			<li>
				<a href="/deck" class:current={pathname === '/deck'}> Deck </a>
			</li>
			<li>
				<a href="/fight" class:current={pathname === '/fight'}> Fight </a>
			</li>
			<li>
				<a href="/profil" class:current={pathname === '/profil'}> Profil </a>
			</li>
		</ul>
	</div>
</nav>

<main>
	{@render children()}
</main>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		background-color: #3b4cca;
		font-family: 'Arial', sans-serif;
	}

	nav {
		display: flex;
		justify-content: center;
		padding: 1rem;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
		position: sticky;
		top: 0;
		z-index: 1000;
	}

	.nav-container {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		gap: 3rem;
	}

	li a {
		color: white;
		text-decoration: none;
		font-weight: bold;
		padding: 0.5rem 1rem;
		border-radius: 20px;
		transition: all 0.3s ease;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	li a:hover {
		background-color: rgba(255, 255, 255, 0.2);
		transform: translateY(-2px);
	}

	.current {
		background-color: rgba(255, 255, 255, 0.3);
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
	}

	main {
		max-width: 1200px;
		margin: 2rem auto;
		padding: 0 1rem;
	}

	@media (max-width: 768px) {
		.nav-container {
			flex-direction: column;
			gap: 1rem;
		}

		ul {
			flex-wrap: wrap;
			justify-content: center;
			gap: 1rem;
		}

		li a {
			padding: 0.5rem;
			font-size: 0.9rem;
		}
	}
</style>
