import pokemonCards from '$lib/cards.json' with { type: 'json' };

export function load() {
	return {
		pokemonCards
	};
}
