export interface PokemonCard {
	id: string;
	name: string;
	hp: string;
	types?: string[];
	attacks?: Array<{
		name: string;
		damage: string;
		text?: string;
	}>;
	weaknesses?: Array<{
		type: string;
		value: string;
	}>;
	resistances?: Array<{
		type: string;
		value: string;
	}>;
	retreatCost?: string[];
	convertedRetreatCost?: number;
	set: {
		id: string;
		name: string;
		series: string;
		printedTotal?: number;
		total?: number;
		legalities?: {
			unlimited?: string;
			standard?: string;
			expanded?: string;
		};
		ptcgoCode?: string;
		releaseDate?: string;
		updatedAt?: string;
		images?: {
			symbol?: string;
			logo?: string;
		};
	};
	images: {
		small: string;
		large: string;
	};
	tcgplayer?: {
		url?: string;
		updatedAt?: string;
		prices?: {
			[key: string]: {
				low?: number;
				mid?: number;
				high?: number;
				market?: number;
				directLow?: number;
			};
		};
	};
	cardmarket?: {
		url?: string;
		updatedAt?: string;
		prices?: {
			averageSellPrice?: number;
			lowPrice?: number;
			trendPrice?: number;
			germanProLow?: number;
			suggestedPrice?: number;
			reverseHoloSell?: number;
			reverseHoloLow?: number;
			reverseHoloTrend?: number;
			lowPriceExPlus?: number;
			avg1?: number;
			avg7?: number;
			avg30?: number;
			reverseHoloAvg1?: number;
			reverseHoloAvg7?: number;
			reverseHoloAvg30?: number;
		};
	};
}

export interface PokemonCardWithCollectionStatus extends PokemonCard {
	isInCollection: boolean;
}
