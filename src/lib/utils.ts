import type { PokemonCard } from './types/cards';

export const randomBooster = (cards: PokemonCard[], count: number = 5): PokemonCard[] => {
	const booster = [...cards].sort(() => 0.5 - Math.random());
	return booster.slice(0, count);
};
