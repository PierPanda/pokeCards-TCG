export const randomBooster = (cards: { images: { large: string } }[], count: number = 5) => {
	const booster = [...cards].sort(() => 0.5 - Math.random());
	return booster.slice(0, count);
};
