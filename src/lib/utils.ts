const createRandomNumber = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min) + min);
};

export { createRandomNumber };

export const rando = (cards: { id: number; name: string }[], count: number = 5) => {
	const shuffled = [...cards].sort(() => 0.5 - Math.random());
	return shuffled.slice(0, count);
};
