import pokemonCards from '$lib/cards.json' with { type: 'json' };
import { isCardInDeck } from '$lib/server/collection';

export function load({ params }) {
	const id = parseInt(params.id);
	const currentCard = pokemonCards[id - 1];

	const isInCollection = isCardInDeck(String(currentCard.id));

	return {
		...currentCard,
		isInCollection
	};
}
