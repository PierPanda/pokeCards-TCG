import pokemonCards from '$lib/cards.json' with { type: 'json' };
import { readDeck } from '$lib/server/collection';

export function load() {
	const deck = readDeck();

	const deckIds = new Set(deck.map((card) => String(card.id)));

	const cardsWithDeckStatus = pokemonCards.map((card) => {
		return {
			...card,
			isInCollection: deckIds.has(String(card.id))
		};
	});

	return {
		pokemonCards: cardsWithDeckStatus
	};
}
