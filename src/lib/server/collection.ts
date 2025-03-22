import fs from 'fs';
import path from 'path';
import type { PokemonCard } from '$lib/types/cards';

const DECK_FILE = 'src/lib/data/deck.json';

const ensureDirectoryExists = () => {
	const dir = path.dirname(DECK_FILE);
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}
};

export const readDeck = (): PokemonCard[] => {
	try {
		ensureDirectoryExists();
		if (!fs.existsSync(DECK_FILE)) {
			fs.writeFileSync(DECK_FILE, '[]', 'utf-8');
			return [];
		}
		const data = fs.readFileSync(DECK_FILE, 'utf-8');
		return JSON.parse(data);
	} catch (error) {
		console.error('Erreur lors de la lecture du deck:', error);
		return [];
	}
};

export const readCollection = readDeck;

export const addToDeck = (newCards: PokemonCard[]) => {
	try {
		ensureDirectoryExists();
		const deck = readDeck();

		const uniqueNewCards = newCards.filter(
			(newCard) => !deck.some((existingCard) => existingCard.id === newCard.id)
		);

		const updatedDeck = [
			...deck,
			...uniqueNewCards.map((card) => ({
				id: card.id,
				name: card.name,
				supertype: card.supertype,
				subtypes: card.subtypes,
				level: card.level,
				hp: card.hp,
				types: card.types,
				evolvesFrom: card.evolvesFrom,
				abilities: card.abilities,
				attacks: card.attacks,
				weaknesses: card.weaknesses,
				images: card.images
			}))
		];

		fs.writeFileSync(DECK_FILE, JSON.stringify(updatedDeck, null, 2), 'utf-8');
		return updatedDeck;
	} catch (error) {
		console.error("Erreur lors de l'ajout au deck:", error);
		throw error;
	}
};

export const addToCollection = addToDeck;

export const isCardInDeck = (cardId: string): boolean => {
	const deck = readDeck();
	console.log(
		'Checking if card',
		cardId,
		'is in deck:',
		deck.map((c) => String(c.id))
	);
	return deck.some((card) => String(card.id) === cardId);
};

export const isCardInCollection = isCardInDeck;
