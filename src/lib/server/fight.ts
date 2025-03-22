import type { PokemonCard } from '$lib/types/cards';

export interface ProcessedPokemonCard extends Omit<PokemonCard, 'hp' | 'attacks'> {
	hp: number;
	attacks: Array<{
		name: string;
		damage: number | null;
		text?: string;
		cost?: string[];
		convertedEnergyCost?: number;
	}>;
}

export interface CombatReadyCard {
	card: ProcessedPokemonCard;
	hp: number;
}

/**
 * Convertit une carte Pokémon brute en carte traitée avec les valeurs numériques
 */
export function processCard(card: PokemonCard): ProcessedPokemonCard {
	return {
		...card,
		hp: Number(card.hp) || 50,
		attacks:
			card.attacks?.map((attack) => ({
				...attack,
				damage: attack.damage ? Number(attack.damage.replace(/[^0-9]/g, '')) : null
			})) || []
	};
}

/**
 * Vérifie si une carte est prête pour le combat
 */
export function isCardCombatReady(card: PokemonCard): boolean {
	const hasValidHP = Number(card.hp) > 0;
	const hasValidAttacks = Array.isArray(card.attacks) && card.attacks.length > 0;

	return hasValidHP && hasValidAttacks;
}

/**
 * Prépare les cartes Pokémon pour le combat
 */
export function prepareCombatCards(userDeck: PokemonCard[]): {
	userCards: ProcessedPokemonCard[];
	opponent: ProcessedPokemonCard | null;
} {
	// Filtrer les cartes valides
	const combatReadyCards = userDeck.filter(isCardCombatReady);

	if (combatReadyCards.length === 0) {
		console.error('Aucune carte prête pour le combat');
		return { userCards: [], opponent: null };
	}

	// Traiter les cartes pour le combat
	const processedCards = combatReadyCards.map(processCard);

	// Sélectionner une carte aléatoire pour l'adversaire
	const randomIndex = Math.floor(Math.random() * processedCards.length);
	const opponent = processedCards[randomIndex];

	return {
		userCards: processedCards,
		opponent
	};
}

/**
 * Simule un lancer de pièce (face ou pile)
 */
export function flipCoin(): boolean {
	return Math.random() > 0.5;
}

/**
 * Calcule les dégâts d'une attaque
 */
export function calculateDamage(attackDamage: number | null): number {
	if (attackDamage === null) {
		// Si l'attaque n'a pas de valeur de dégâts, générer une valeur aléatoire entre 10 et 30
		return Math.floor(Math.random() * 20) + 10;
	}

	// Ajouter une petite variation aux dégâts (±10%)
	const variation = attackDamage * 0.1;
	const minDamage = Math.max(1, attackDamage - variation);
	const maxDamage = attackDamage + variation;

	return Math.floor(Math.random() * (maxDamage - minDamage + 1)) + minDamage;
}

/**
 * Sélectionne une attaque aléatoire pour l'adversaire
 */
export function selectRandomAttack(card: ProcessedPokemonCard): {
	name: string;
	damage: number | null;
	text?: string;
} {
	if (!card.attacks || card.attacks.length === 0) {
		return { name: 'Lutte', damage: 10 };
	}

	const randomIndex = Math.floor(Math.random() * card.attacks.length);
	return card.attacks[randomIndex];
}

/**
 * Initialise un nouveau combat entre un joueur et un adversaire
 */
export function initializeCombat(
	playerCard: ProcessedPokemonCard,
	opponentCard: ProcessedPokemonCard
) {
	return {
		playerCard,
		opponentCard,
		playerHP: Number(playerCard.hp),
		opponentHP: Number(opponentCard.hp),
		currentTurn: 'player',
		gameOver: false,
		winner: null,
		gameLog: ['Le combat commence! Lancez la pièce pour voir si vous pouvez attaquer.']
	};
}
