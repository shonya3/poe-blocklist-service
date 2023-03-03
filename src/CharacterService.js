const getCharacterInfo = async (account, character) => {
	try {
		console.log(`GET ITEMS`);
		const url = new URL('https://www.pathofexile.com/character-window/get-items');
		url.searchParams.append('accountName', account);
		url.searchParams.append('character', character);
		const response = await fetch(url);
		const items = await response.json();
		return items;
	} catch (err) {
		console.log(`ERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR`, err);
	}
};

export const CharacterService = {
	getCharacterInfo,
};
