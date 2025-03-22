import { readDeck } from '$lib/server/collection';

export function load() {
	const deck = readDeck();
	return {
		collection: deck
	};
}
