/**
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 * @param  {Array} array The array to shuffle
 * @return {Array} A shuffled copy of original array
 */
const shuffle = function<T>(array: Array<T>): Array<T> {

  const shuffleArray = [...array];

	let currentIndex = array.length;
	let temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = shuffleArray[currentIndex];
		shuffleArray[currentIndex] = shuffleArray[randomIndex];
		shuffleArray[randomIndex] = temporaryValue;
	}

	return shuffleArray;

};

export default shuffle;
