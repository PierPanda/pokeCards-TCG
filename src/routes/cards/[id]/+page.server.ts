import pokemonCards from '$lib/cards.json' with { type: 'json' };

export function load({ params }) {
	// Return permet de donner acces aux données de la page server à la pagee svelte (c'est la props) accessible avec data
	// id est une dépendance de la function load (la function est rejoué)
	const id = parseInt(params.id);
	const currentCard = pokemonCards[id - 1];

	return currentCard;
}
