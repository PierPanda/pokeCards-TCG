<script lang="ts">
	import Button from '$lib/components/Button.svelte';

	// Définir ProcessedPokemonCard localement si non disponible
	interface ProcessedPokemonCard {
		id: string;
		name: string;
		hp: number;
		images: {
			small: string;
			large?: string;
		};
		attacks: Array<{
			name: string;
			damage: number | null;
			text?: string;
			cost?: string[];
			convertedEnergyCost?: number;
		}>;
		[key: string]: any;
	}

	// Modifier l'interface pour correspondre aux attaques de ProcessedPokemonCard
	interface Attack {
		name: string;
		damage: number | null;
		text?: string;
		cost?: string[];
		convertedEnergyCost?: number;
	}

	// Utiliser la syntaxe simple export let pour éviter les erreurs
	export let data;

	let userCards: ProcessedPokemonCard[] = [];
	let opponent: ProcessedPokemonCard | null = null;

	// Vérifier si data est défini et extraire ses propriétés
	if (data) {
		userCards = data.userCards || [];
		opponent = data.opponent || null;
	}

	// États du jeu
	let selectedCard: ProcessedPokemonCard | null = null;
	let combatStarted = false;
	let playerHP = 0;
	let opponentHP = 0;
	let gameLog: string[] = [];

	// États spécifiques au système de pièce
	let currentTurn = 'player'; // 'player' ou 'opponent'
	let coinFlipActive = false;
	let canAttack = false;
	let canDefend = false;
	let coinResult = ''; // 'face' ou 'pile'
	let selectedAttack: Attack | null = null;
	let gameOver = false;
	let winner = '';

	// Ajouter pour les animations
	let isFlipping = false;
	let isAttacking = false;
	let isDefending = false;
	let lastAction = ''; // Pour savoir qui a agi en dernier

	function selectCard(card: ProcessedPokemonCard) {
		selectedCard = card;
		console.log('Carte sélectionnée:', card.name);
	}

	function startCombat() {
		if (!selectedCard || !opponent) return;

		combatStarted = true;
		playerHP = Number(selectedCard.hp || 50);
		opponentHP = Number(opponent.hp || 50);
		currentTurn = 'player';
		updateGameLog("Le combat commence ! C'est à votre tour.");

		// Activer le lancer de pièce pour le joueur
		coinFlipActive = true;
		canAttack = false;

		console.log('Combat démarré entre', selectedCard.name, 'et', opponent.name);
	}

	function animateCoinFlip() {
		isFlipping = true;
		setTimeout(() => {
			isFlipping = false;
		}, 1500);
	}

	function animateAttack(isPlayer: boolean) {
		isAttacking = true;
		lastAction = isPlayer ? 'player' : 'opponent';
		setTimeout(() => {
			isAttacking = false;
		}, 500);
	}

	function animateDefense(isPlayer: boolean) {
		isDefending = true;
		lastAction = isPlayer ? 'player' : 'opponent';
		setTimeout(() => {
			isDefending = false;
		}, 500);
	}

	function updateGameLog(message: string) {
		// Remplacer le gameLog par un seul message au lieu d'ajouter
		gameLog = [message];
	}

	function flipCoin() {
		animateCoinFlip();

		// Attendre la fin de l'animation pour continuer la logique
		setTimeout(() => {
			// Simuler un lancer de pièce (50% chance pour chaque résultat)
			const isHeads = Math.random() < 0.5;
			coinResult = isHeads ? 'face' : 'pile';

			updateGameLog(`Vous lancez la pièce et obtenez ${coinResult.toUpperCase()}`);

			if (currentTurn === 'player') {
				// C'est le tour du joueur
				if (coinResult === 'face') {
					canAttack = true;
					updateGameLog('Vous pouvez attaquer !');
					coinFlipActive = false;
				} else {
					canAttack = false;
					updateGameLog('Vous ne pouvez pas attaquer.');
					coinFlipActive = false;

					// Passer au tour de l'adversaire automatiquement
					setTimeout(() => {
						currentTurn = 'opponent';
						updateGameLog("C'est au tour de l'adversaire.");
						// L'adversaire lance la pièce automatiquement
						opponentFlipCoin();
					}, 1500);
				}
			} else if (currentTurn === 'defense' && selectedAttack) {
				// Le joueur a attaqué, l'adversaire essaie de parer
				if (coinResult === 'face') {
					canDefend = true;
					updateGameLog(`L'adversaire pare votre attaque ${selectedAttack.name}.`);
					animateDefense(false);

					// Réinitialiser pour le prochain tour
					selectedAttack = null;

					// Passer au tour de l'adversaire
					setTimeout(() => {
						currentTurn = 'opponent';
						updateGameLog("C'est au tour de l'adversaire.");
						// L'adversaire lance la pièce automatiquement
						opponentFlipCoin();
					}, 1500);
				} else {
					canDefend = false;
					// Utiliser directement le damage comme nombre ou valeur par défaut
					const damage = selectedAttack.damage || 10;
					opponentHP = Math.max(0, opponentHP - damage);
					updateGameLog(
						`L'adversaire ne peut pas parer ! Votre ${selectedCard?.name} inflige ${damage} dégâts avec ${selectedAttack.name} !`
					);
					animateAttack(true);

					// Vérifier si l'adversaire est K.O.
					if (opponentHP <= 0) {
						gameOver = true;
						winner = 'player';
						updateGameLog('Vous avez gagné !');
						return;
					}

					// Réinitialiser pour le prochain tour
					selectedAttack = null;

					// Passer au tour de l'adversaire
					setTimeout(() => {
						currentTurn = 'opponent';
						updateGameLog("C'est au tour de l'adversaire.");
						// L'adversaire lance la pièce automatiquement
						opponentFlipCoin();
					}, 1500);
				}
			}
		}, 1000); // Attendre que l'animation de la pièce soit finie
	}

	function selectAttack(attack: Attack) {
		if (!canAttack) return;

		selectedAttack = attack;
		updateGameLog(`Vous choisissez l'attaque: ${attack.name}`);

		// L'adversaire doit maintenant lancer la pièce pour essayer de parer
		coinFlipActive = true;
		currentTurn = 'defense';

		setTimeout(() => {
			updateGameLog("L'adversaire tente de parer...");

			// Simuler un lancer de pièce pour l'adversaire (50% chance pour chaque résultat)
			const isHeads = Math.random() < 0.5;
			coinResult = isHeads ? 'face' : 'pile';

			setTimeout(() => {
				updateGameLog(`L'adversaire lance la pièce et obtient ${coinResult.toUpperCase()}`);

				if (coinResult === 'face') {
					// L'adversaire pare l'attaque
					setTimeout(() => {
						updateGameLog(`L'adversaire pare votre attaque ${attack.name}.`);

						// Réinitialiser pour le prochain tour
						selectedAttack = null;

						// Passer au tour de l'adversaire après un court délai
						setTimeout(() => {
							currentTurn = 'opponent';
							updateGameLog("C'est au tour de l'adversaire.");
							// L'adversaire lance la pièce automatiquement
							opponentFlipCoin();
						}, 1500);
					}, 1000);
				} else {
					// L'attaque réussit
					const damage = attack.damage || 10;
					opponentHP = Math.max(0, opponentHP - damage);

					setTimeout(() => {
						updateGameLog(
							`L'adversaire ne peut pas parer ! Votre ${selectedCard?.name} inflige ${damage} dégâts avec ${attack.name} !`
						);
						animateAttack(true);

						// Vérifier si l'adversaire est K.O.
						if (opponentHP <= 0) {
							gameOver = true;
							winner = 'player';
							updateGameLog('Vous avez gagné !');
							return;
						}

						// Réinitialiser pour le prochain tour
						selectedAttack = null;

						// Passer au tour de l'adversaire après un court délai
						setTimeout(() => {
							currentTurn = 'opponent';
							updateGameLog("C'est au tour de l'adversaire.");
							// L'adversaire lance la pièce automatiquement
							opponentFlipCoin();
						}, 1500);
					}, 1000);
				}
			}, 1000);
		}, 500);
	}

	function opponentFlipCoin() {
		animateCoinFlip();

		// Attendre la fin de l'animation pour continuer la logique
		setTimeout(() => {
			// Simuler un lancer de pièce pour l'ordinateur
			const isHeads = Math.random() < 0.5;
			coinResult = isHeads ? 'face' : 'pile';

			updateGameLog(`L'adversaire lance la pièce et obtient ${coinResult.toUpperCase()}`);

			if (coinResult === 'face') {
				// L'ordinateur peut attaquer
				setTimeout(() => {
					updateGameLog("L'adversaire peut attaquer !");

					// Sélectionner une attaque aléatoire
					const availableAttacks = opponent?.attacks || [];
					if (availableAttacks.length > 0) {
						const randomAttack =
							availableAttacks[Math.floor(Math.random() * availableAttacks.length)];

						setTimeout(() => {
							updateGameLog(`L'adversaire utilise ${randomAttack.name} !`);

							// Le joueur doit se défendre
							setTimeout(() => {
								currentTurn = 'player-defense';
								updateGameLog('Lancez la pièce pour essayer de vous défendre !');
								coinFlipActive = true;
							}, 1500);
						}, 1000);
					} else {
						updateGameLog("L'adversaire n'a pas d'attaques disponibles.");
						// Passer au tour du joueur automatiquement
						setTimeout(() => {
							currentTurn = 'player';
							updateGameLog("C'est à votre tour. Lancez la pièce pour attaquer !");
							coinFlipActive = true;
						}, 1500);
					}
				}, 1000);
			} else {
				// L'ordinateur ne peut pas attaquer
				setTimeout(() => {
					updateGameLog("L'adversaire ne peut pas attaquer !");

					// Passer au tour du joueur automatiquement
					setTimeout(() => {
						currentTurn = 'player';
						updateGameLog("C'est à votre tour. Lancez la pièce pour attaquer !");
						coinFlipActive = true;
					}, 1500);
				}, 1000);
			}
		}, 1000); // Attendre que l'animation de la pièce soit finie
	}

	function playerDefenseCoinFlip() {
		animateCoinFlip();

		// Attendre la fin de l'animation pour continuer la logique
		setTimeout(() => {
			// Simuler un lancer de pièce
			const isHeads = Math.random() < 0.5;
			coinResult = isHeads ? 'face' : 'pile';

			updateGameLog(`Vous lancez la pièce et obtenez ${coinResult.toUpperCase()}`);

			if (coinResult === 'face') {
				// Le joueur se défend avec succès
				setTimeout(() => {
					updateGameLog("Vous avez paré l'attaque avec succès !");
					animateDefense(true);

					coinFlipActive = false;

					// Passer au tour du joueur après un court délai
					setTimeout(() => {
						currentTurn = 'player';
						updateGameLog("C'est à votre tour. Lancez la pièce pour attaquer !");
						coinFlipActive = true;
					}, 1500);
				}, 1000);
			} else {
				// L'attaque de l'ordinateur réussit
				// Choisir une attaque aléatoire pour l'adversaire
				const availableAttacks = opponent?.attacks || [];
				if (availableAttacks.length > 0) {
					const randomAttack =
						availableAttacks[Math.floor(Math.random() * availableAttacks.length)];
					const damage = randomAttack.damage || 10;
					playerHP = Math.max(0, playerHP - damage);

					setTimeout(() => {
						updateGameLog(
							`Vous ne pouvez pas parer ! L'adversaire vous inflige ${damage} dégâts avec ${randomAttack.name} !`
						);
						animateAttack(false);

						// Vérifier si le joueur est K.O.
						if (playerHP <= 0) {
							gameOver = true;
							winner = 'opponent';
							updateGameLog('Vous avez perdu !');
							return;
						}

						coinFlipActive = false;

						// Passer au tour du joueur après un court délai
						setTimeout(() => {
							currentTurn = 'player';
							updateGameLog("C'est à votre tour. Lancez la pièce pour attaquer !");
							coinFlipActive = true;
						}, 1500);
					}, 1000);
				}
			}
		}, 1000); // Attendre que l'animation de la pièce soit finie
	}

	function backToSelection() {
		combatStarted = false;
		selectedCard = null;
		gameLog = [];
		currentTurn = 'player';
		coinFlipActive = false;
		canAttack = false;
		canDefend = false;
		coinResult = '';
		selectedAttack = null;
		gameOver = false;
		winner = '';
	}

	function getHealthBarClass(currentHP: number, maxHP: number): string {
		const ratio = currentHP / maxHP;
		if (ratio <= 0.25) return 'danger';
		if (ratio <= 0.5) return 'warning';
		return '';
	}

	function restartGame() {
		selectedCard = null;
		combatStarted = false;
		coinResult = '';
		currentTurn = 'player';
		canAttack = false;
		canDefend = false;
		coinFlipActive = false;
		playerHP = 0;
		opponentHP = 0;
		selectedAttack = null;
		gameOver = false;
		winner = '';
		updateGameLog('Choisissez une carte et commencez le combat !');
	}
</script>

<div class="combat-container">
	<h1 class="fade-in">Arène de Combat Pokémon</h1>

	{#if !combatStarted}
		<div class="card-selection fade-in">
			<h2>Choisissez votre Pokémon</h2>
			<div class="card-grid">
				{#if userCards && userCards.length > 0}
					{#each userCards as card, index}
						<div
							class="card-item {selectedCard === card ? 'selected' : ''}"
							on:click={() => selectCard(card)}
							on:keydown={(e) => e.key === 'Enter' && selectCard(card)}
							role="button"
							tabindex="0"
						>
							<img src={card.images.small} alt={card.name} />
							<div class="card-name">{card.name}</div>
						</div>
					{/each}
				{:else}
					<p>Aucune carte disponible.</p>
				{/if}
			</div>
		</div>
		{#if selectedCard}
			<Button type="action" onClick={startCombat} label="Combattre !" />
		{/if}
	{:else}
		<div class="battle-view">
			<div class="player-side">
				{#if selectedCard}
					<div class="battle-card {lastAction === 'player' && isAttacking ? 'attacking' : ''}">
						<h3>Votre Pokémon</h3>
						<img src={selectedCard.images.small} alt={selectedCard.name} />
						<div class="health-bar">
							<div class="health-label">HP: {playerHP}</div>
							<div class="health-track">
								<div
									class="health-fill {getHealthBarClass(playerHP, Number(selectedCard.hp || 50))}"
									style="width: {(playerHP / Number(selectedCard.hp || 50)) * 100}%"
								></div>
							</div>
						</div>
						<h4>{selectedCard.name}</h4>

						{#if currentTurn !== 'player' && currentTurn !== 'player-defense' && !gameOver}
							<p class="waiting-text">Attendez votre tour...</p>
						{/if}
					</div>
					<div class="player-log">
						{#if gameLog.length > 0 && (gameLog[0].includes('Vous') || gameLog[0].includes('votre'))}
							<div class="log-message player">{gameLog[0]}</div>
						{/if}
					</div>
				{/if}
			</div>

			<div class="battle-center">
				<div class="versus">VS</div>

				{#if isFlipping}
					<div class="coin-animation animate">
						{coinResult || '?'}
					</div>
				{/if}

				<div class="turn-indicator">
					Tour: <span class={currentTurn}
						>{currentTurn === 'player' || currentTurn === 'player-defense'
							? 'Joueur'
							: 'Adversaire'}</span
					>
				</div>

				<div class="game-controls">
					{#if currentTurn === 'player' && !gameOver}
						{#if coinFlipActive}
							<div class="coin-flip-container fade-in">
								<p>Lancez la pièce pour voir si vous pouvez attaquer</p>
								<button class="coin-button" on:click={flipCoin} disabled={isFlipping}>
									Lancer la pièce
								</button>
							</div>
						{:else if canAttack}
							<div class="attacks-container fade-in">
								<p>Choisissez une attaque:</p>
								{#if selectedCard && selectedCard.attacks && selectedCard.attacks.length > 0}
									{#each selectedCard.attacks as attack}
										<button class="attack-button" on:click={() => selectAttack(attack)}>
											{attack.name} ({attack.damage || '?'})
										</button>
									{/each}
								{/if}
							</div>
						{/if}
					{:else if currentTurn === 'player-defense' && !gameOver}
						<div class="coin-flip-container fade-in">
							<p>Lancez la pièce pour essayer de parer l'attaque de l'adversaire</p>
							<button class="coin-button" on:click={playerDefenseCoinFlip} disabled={isFlipping}>
								Lancer la pièce
							</button>
						</div>
					{:else if currentTurn === 'opponent' && !gameOver}
						<div class="waiting-container fade-in">
							<p>L'adversaire réfléchit...</p>
						</div>
					{/if}
				</div>
			</div>

			<div class="opponent-side">
				{#if opponent}
					<div class="battle-card {lastAction === 'opponent' && isAttacking ? 'attacking' : ''}">
						<h3>Pokémon Adversaire</h3>
						<img src={opponent.images.small} alt={opponent.name} />
						<div class="health-bar">
							<div class="health-label">HP: {opponentHP}</div>
							<div class="health-track">
								<div
									class="health-fill {getHealthBarClass(opponentHP, Number(opponent.hp || 50))}"
									style="width: {(opponentHP / Number(opponent.hp || 50)) * 100}%"
								></div>
							</div>
						</div>
						<h4>{opponent.name}</h4>
					</div>
					<!-- Log de l'adversaire -->
					<div class="opponent-log">
						{#if gameLog.length > 0 && (gameLog[0].includes('adversaire') || gameLog[0].includes("L'"))}
							<div class="log-message opponent">{gameLog[0]}</div>
						{/if}
					</div>
				{/if}
			</div>
		</div>

		<!-- Ajout des boutons d'action -->
		<div class="action-container">
			<button class="back-button" on:click={backToSelection}>Quitter</button>
			{#if gameOver}
				<button class="restart-button" on:click={startCombat}>Rejouer</button>
			{/if}
		</div>

		{#if gameOver}
			<div class="game-over fade-in">
				<div class="winner-message">
					{#if winner === 'player'}
						Félicitations ! Vous avez gagné !
					{:else}
						Dommage ! Vous avez perdu.
					{/if}
				</div>
				<button class="restart-button" on:click={restartGame}> Nouvelle partie </button>
			</div>
		{/if}
	{/if}
</div>

<style>
	.combat-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 20px;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	h1,
	h2,
	h3,
	h4 {
		color: #ffcb05;
		text-align: center;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
	}

	h1 {
		font-size: 2.5rem;
		margin-bottom: 1.5rem;
		position: relative;
	}

	.card-selection {
		margin-bottom: 30px;
		text-align: center;
		padding: 1.5rem;
		border-radius: 15px;
	}

	.card-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		gap: 20px;
		margin-top: 25px;
	}

	.card-item {
		cursor: pointer;
		transition:
			transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
			box-shadow 0.3s ease;
		border-radius: 10px;
		overflow: hidden;
		position: relative;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
	}

	.card-item:hover {
		transform: translateY(-10px) scale(1.05);
		box-shadow: 0 15px 30px rgba(42, 117, 187, 0.3);
	}

	.card-item.selected {
		border: 3px solid #ffcb05;
		transform: translateY(-10px) scale(1.05);
		box-shadow: 0 15px 30px rgba(255, 203, 5, 0.4);
	}

	.card-item img {
		width: 100%;
		height: auto;
		display: block;
	}

	.card-name {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.7);
		color: white;
		padding: 8px;
		font-size: 0.9rem;
		text-align: center;
		font-weight: bold;
	}

	.combat-arena {
		flex: 1;
		border-radius: 20px;
		padding: 25px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
		margin-top: 20px;
		display: flex;
		flex-direction: column;
	}

	.battle-view {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 30px;
		margin-top: 20px;
		flex: 1;
	}

	.player-side,
	.opponent-side {
		flex: 1.25;
		width: 32.5%;
		text-align: center;
		position: relative;
		display: flex;
		flex-direction: column;
		height: 100%;
		transition: transform 0.3s ease;
	}

	.battle-card {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 15px;
		padding: 20px;
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
		margin-bottom: 15px;
		flex: 1;
		position: relative;
		overflow: hidden;
	}

	.battle-card img {
		max-width: 100%;
		height: auto;
		border-radius: 8px;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
		margin-bottom: 10px;
		transition: transform 0.2s ease;
	}

	.battle-card img:hover {
		transform: scale(1.03);
	}

	.battle-center {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		padding: 0 20px;
		width: 35%;
		position: relative;
	}

	.versus {
		position: relative;
		padding: 5px 15px;
		border-radius: 50%;
		background: linear-gradient(135deg, rgba(255, 203, 5, 0.2), rgba(42, 117, 187, 0.2));
		border: 2px solid rgba(255, 255, 255, 0.5);
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
		font-size: 2.5rem;
		font-weight: bold;
		color: #ffcb05;
		margin-bottom: 25px;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
	}

	.turn-indicator {
		background: linear-gradient(to right, #f0f0f0, #e0e0e0);
		border-radius: 25px;
		padding: 10px 20px;
		font-weight: bold;
		font-size: 1rem;
		margin-top: 25px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		border: 1px solid rgba(0, 0, 0, 0.05);
		min-width: 150px;
		text-align: center;
	}

	.turn-indicator span {
		font-weight: bold;
		padding: 3px 8px;
		border-radius: 15px;
	}

	.turn-indicator span.player,
	.turn-indicator span.player-defense {
		color: white;
		background-color: #2a75bb;
	}

	.turn-indicator span.opponent,
	.turn-indicator span.defense {
		color: #2a75bb;
		background-color: #ffcb05;
	}

	.health-bar {
		margin: 15px 0;
		width: 100%;
	}

	.health-label {
		font-weight: bold;
		margin-bottom: 5px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.health-track {
		height: 15px;
		background-color: #e0e0e0;
		border-radius: 10px;
		overflow: hidden;
		box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.1);
	}

	.health-fill {
		height: 100%;
		background: linear-gradient(to right, #4caf50, #8bc34a);
		transition: width 0.5s ease;
		border-radius: 10px;
	}

	.health-fill.warning {
		background: linear-gradient(to right, #ffc107, #ffeb3b);
	}

	.health-fill.danger {
		background: linear-gradient(to right, #f44336, #ff5722);
	}
	.coin-flip-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	/* Styles pour les commandes de combat */
	.coin-flip-container,
	.attacks-container,
	.waiting-container {
		margin-top: 20px;
		margin: auto;
		padding: 20px;
		border-radius: 12px;
		background-color: rgba(255, 255, 255, 0.95);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
		border: 1px solid rgba(0, 0, 0, 0.03);
		width: 100%;
		transition: all 0.3s ease;
		transform-origin: center;
		animation: slideIn 0.4s ease forwards;
	}

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.coin-button,
	.attack-button,
	.play-button {
		background: linear-gradient(145deg, #ffcb05, #ffd740);
		color: #2a75bb;
		border: none;
		border-radius: 25px;
		padding: 1rem 2rem;
		margin: 8px;
		font-weight: bold;
		cursor: pointer;
		transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
		position: relative;
		overflow: hidden;
	}

	.coin-button:hover,
	.attack-button:hover,
	.play-button:hover {
		background: linear-gradient(145deg, #2a75bb, #3a85cb);
		color: white;
		transform: translateY(-3px) scale(1.05);
		box-shadow: 0 8px 20px rgba(42, 117, 187, 0.3);
	}

	.attack-button {
		display: block;
		width: 100%;
		margin: 10px 0;
		text-align: left;
		padding: 15px 20px;
		border-radius: 15px;
		position: relative;
		overflow: hidden;
	}

	.attack-button::after {
		content: '→';
		position: absolute;
		right: 15px;
		top: 50%;
		transform: translateY(-50%);
		transition: transform 0.3s ease;
	}

	.attack-button:hover::after {
		transform: translate(5px, -50%);
	}

	/* Styles pour les logs */
	.player-log,
	.opponent-log {
		min-height: 60px;
		margin: 15px auto;
		width: 90%;
	}

	.log-message {
		font-size: 0.95rem;
		padding: 12px 18px;
		border-radius: 10px;
		text-align: center;
		width: 100%;
		animation: fadeIn 0.5s ease;
		box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
		font-weight: 500;
		letter-spacing: 0.2px;
	}

	.log-message.player {
		background-color: #ffcb05;
		border-left: 5px solid #2a75bb;
		color: #2a75bb;
	}

	.log-message.opponent {
		background-color: #ffcb05;
		border-left: 5px solid #ffcb05;
		color: #946b00;
	}

	.log-message.system {
		background-color: #ffcb05;
		font-style: italic;
		border-left: 5px solid #6c757d;
		color: #495057;
	}

	@keyframes flip {
		0% {
			transform: rotateY(0deg);
		}
		40% {
			transform: rotateY(1080deg);
		}
		50% {
			transform: rotateY(1080deg) scale(1.2);
		}
		60% {
			transform: rotateY(1080deg) scale(1);
		}
		100% {
			transform: rotateY(1080deg);
		}
	}

	.coin-animation {
		width: 100px;
		height: 100px;
		background: linear-gradient(145deg, #ffcb05, #ffd740);
		border-radius: 50%;
		margin: 25px auto;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: bold;
		color: #2a75bb;
		box-shadow: 0 5px 20px rgba(255, 203, 5, 0.5);
		z-index: 10;
		border: 4px solid rgba(255, 255, 255, 0.8);
		font-size: 1.3rem;
	}

	.coin-animation.animate {
		animation: flip 2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
	}

	/* Styles pour les boutons d'action */
	.action-container {
		display: flex;
		justify-content: center;
		gap: 20px;
		margin-top: 30px;
		padding: 15px;
	}

	.back-button {
		background: linear-gradient(145deg, #6c757d, #5a6268);
		color: white;
		border: none;
		border-radius: 25px;
		padding: 12px 25px;
		font-weight: bold;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
	}

	.back-button:hover {
		background: linear-gradient(145deg, #5a6268, #495057);
		transform: translateY(-3px) scale(1.05);
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
	}

	.restart-button {
		background: linear-gradient(145deg, #ffcb05, #ffd740);
		color: #2a75bb;
		border: none;
		border-radius: 25px;
		padding: 12px 25px;
		font-weight: bold;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
	}

	.restart-button:hover {
		background: linear-gradient(145deg, #2a75bb, #3a85cb);
		color: white;
		transform: translateY(-3px) scale(1.05);
		box-shadow: 0 8px 20px rgba(42, 117, 187, 0.3);
	}

	/* Styles pour les messages de fin de partie */
	.game-over {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.8);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: white;
		border-radius: 15px;
		z-index: 10;
		animation: fadeIn 0.8s ease-in;
		backdrop-filter: blur(5px);
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.winner-message {
		font-size: 2.5rem;
		margin-bottom: 30px;
		text-align: center;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
	}

	/* Animation pour les attaques */
	@keyframes attack {
		0% {
			transform: translateX(0);
		}
		25% {
			transform: translateX(20px);
		}
		50% {
			transform: translateX(0);
		}
		75% {
			transform: translateX(-20px);
		}
		100% {
			transform: translateX(0);
		}
	}

	.attacking {
		animation: attack 0.5s ease;
	}

	.fade-in {
		animation: fadeIn 0.5s ease;
	}

	@media (min-height: 768px) {
		.combat-container {
			height: 100vh;
		}
	}

	@media (max-width: 992px) {
		.player-side,
		.opponent-side {
			width: 40%;
		}

		.battle-center {
			width: 20%;
		}
	}

	@media (max-width: 768px) {
		.battle-view {
			flex-direction: column;
		}

		.battle-center {
			order: 1;
			margin: 20px 0;
			width: 100%;
			padding: 0;
		}

		.player-side,
		.opponent-side {
			order: 2;
			width: 100%;
		}

		.opponent-side {
			order: 0;
		}

		.versus::before,
		.versus::after {
			display: none;
		}

		.card-grid {
			grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
		}

		.coin-animation {
			width: 80px;
			height: 80px;
			font-size: 1.1rem;
		}
	}

	.game-controls {
		width: 100%;
		margin-top: 25px;
		display: flex;
		flex-direction: column;
		align-items: center;
		transition: all 0.3s ease;
	}

	.waiting-text {
		font-style: italic;
		color: #6c757d;
		margin: 15px 0;
		font-size: 0.9rem;
	}
</style>
