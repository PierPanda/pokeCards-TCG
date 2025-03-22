import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { readDeck, addToDeck } from '$lib/server/collection';

export const GET: RequestHandler = async () => {
	const deck = readDeck();
	return json(deck);
};

export const POST: RequestHandler = async ({ request }) => {
	try {
		const newCards = await request.json();
		const updatedDeck = addToDeck(newCards);
		return json(updatedDeck);
	} catch (error: Error | unknown) {
		const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
		return new Response(
			JSON.stringify({ error: `Erreur lors de l'ajout des cartes au deck: ${errorMessage}` }),
			{
				status: 500,
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
	}
};
