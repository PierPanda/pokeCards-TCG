import { writable, type Writable } from 'svelte/store';
import type { ProcessedPokemonCard } from '$lib/server/fight';

export type CombatTurn = 'player' | 'player-defense' | 'opponent' | 'opponent-defense';
export type Winner = 'player' | 'opponent' | null;

export interface CombatState {
	playerCard: ProcessedPokemonCard | null;
	opponentCard: ProcessedPokemonCard | null;
	playerHP: number;
	opponentHP: number;
	currentTurn: CombatTurn;
	lastAction: 'player' | 'opponent' | null;
	canAttack: boolean;
	coinFlipActive: boolean;
	isFlipping: boolean;
	coinResult: string | null;
	gameOver: boolean;
	winner: Winner;
	isAttacking: boolean;
	gameLog: string[];
}

export const initialCombatState: CombatState = {
	playerCard: null,
	opponentCard: null,
	playerHP: 0,
	opponentHP: 0,
	currentTurn: 'player',
	lastAction: null,
	canAttack: false,
	coinFlipActive: true,
	isFlipping: false,
	coinResult: null,
	gameOver: false,
	winner: null,
	isAttacking: false,
	gameLog: ["Bienvenue dans l'arène de combat !"]
};

export const combatState: Writable<CombatState> = writable(initialCombatState);

export function initializeCombat(
	playerCard: ProcessedPokemonCard,
	opponentCard: ProcessedPokemonCard
): void {
	combatState.set({
		...initialCombatState,
		playerCard,
		opponentCard,
		playerHP: Number(playerCard.hp),
		opponentHP: Number(opponentCard.hp),
		gameLog: ['Le combat commence! Lancez la pièce pour voir si vous pouvez attaquer.']
	});
}

export function updateGameLog(message: string): void {
	combatState.update((state) => {
		return {
			...state,
			gameLog: [message, ...state.gameLog].slice(0, 10)
		};
	});
}

export function flipCoin(): Promise<boolean> {
	return new Promise((resolve) => {
		combatState.update((state) => ({
			...state,
			isFlipping: true,
			coinResult: null
		}));

		setTimeout(() => {
			const result = Math.random() > 0.5;
			combatState.update((state) => ({
				...state,
				isFlipping: false,
				coinResult: result ? 'FACE' : 'PILE'
			}));
			resolve(result);
		}, 1500);
	});
}

export function applyDamage(target: 'player' | 'opponent', amount: number): void {
	combatState.update((state) => {
		let playerHP = state.playerHP;
		let opponentHP = state.opponentHP;
		let gameOver = state.gameOver;
		let winner = state.winner;

		if (target === 'player') {
			playerHP = Math.max(0, playerHP - amount);
			if (playerHP <= 0) {
				gameOver = true;
				winner = 'opponent';
				updateGameLog('Vous avez perdu le combat !');
			}
		} else {
			opponentHP = Math.max(0, opponentHP - amount);
			if (opponentHP <= 0) {
				gameOver = true;
				winner = 'player';
				updateGameLog('Vous avez gagné le combat !');
			}
		}

		return {
			...state,
			playerHP,
			opponentHP,
			gameOver,
			winner
		};
	});
}

export function nextTurn(): void {
	combatState.update((state) => {
		let nextTurn: CombatTurn = 'player';

		switch (state.currentTurn) {
			case 'player':
				nextTurn = 'opponent';
				break;
			case 'opponent':
				nextTurn = 'player';
				break;
			case 'player-defense':
				nextTurn = 'opponent';
				break;
			case 'opponent-defense':
				nextTurn = 'player';
				break;
		}

		return {
			...state,
			currentTurn: nextTurn,
			coinFlipActive: true,
			canAttack: false,
			isAttacking: false
		};
	});
}

export function startAttackAnimation(attacker: 'player' | 'opponent'): Promise<void> {
	return new Promise((resolve) => {
		combatState.update((state) => ({
			...state,
			isAttacking: true,
			lastAction: attacker
		}));

		setTimeout(() => {
			combatState.update((state) => ({
				...state,
				isAttacking: false
			}));
			resolve();
		}, 500);
	});
}

export function resetCombat(): void {
	combatState.set(initialCombatState);
}
