<script lang="ts">
	import { page } from '$app/state';
	const { children, data } = $props();
	const pathname = $derived(page.url.pathname);
</script>

<nav>
	<ul>
		<li><a href="/" class:current={pathname === '/'}>Accueil</a></li>
		<li>
			<a href="/deck" class:current={pathname === '/deck'}>Deck</a>
		</li>
		<li>
			<a href="/cards" class:current={pathname === '/cards'}>Cartes</a>
		</li>
		<li><a href="/profil" class:current={pathname === '/profil'}>Profil</a></li>
	</ul>
</nav>

<main>
	{@render children()}
</main>

<style>
	nav {
		padding: 1rem;
	}

	ul {
		list-style: none;
		padding: 0;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		gap: 1rem;
	}

	.current {
		color: black;
	}
</style>
