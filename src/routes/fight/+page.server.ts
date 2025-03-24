import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { PokemonCard } from '$lib/types/cards';
import { prepareCombatCards } from '$lib/server/fight';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const userDeckResponse = await fetch('/api/collection');

		if (!userDeckResponse.ok) {
			throw new Error('Erreur de chargement du deck utilisateur');
		}

		const userDeck: PokemonCard[] = await userDeckResponse.json();

		if (!userDeck || userDeck.length === 0) {
			throw new Error('Le deck utilisateur est vide');
		}

		console.log(`Nombre de cartes dans le deck de l'utilisateur: ${userDeck.length}`);

		const { userCards, opponent } = prepareCombatCards(userDeck);

		if (userCards.length === 0) {
			console.error("Aucune carte utilisateur n'est prête pour le combat");
			throw error(500, "Aucune carte utilisateur n'est prête pour le combat");
		}

		if (!opponent) {
			console.error('Impossible de sélectionner un adversaire');
			throw error(500, 'Impossible de sélectionner un adversaire');
		}

		console.log(`Nombre de cartes prêtes pour le combat: ${userCards.length}`);
		console.log(`Adversaire sélectionné: ${opponent.name}`);

		return {
			userCards,
			opponent
		};
	} catch (err) {
		console.error('Erreur lors du chargement des cartes pour le combat:', err);
		throw error(500, { message: 'Erreur lors du chargement des cartes pour le combat' });
	}
};
