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
		return null;
	}
};

const getNameFromHtmlText = htmlText => {
	try {
		const line = htmlText.split('\n').find(line => line.includes('new C'));
		const firstBracketIndex = line.indexOf('{');
		const lastBracketIndex = line.indexOf('}');
		const { name } = JSON.parse(line.slice(firstBracketIndex, lastBracketIndex + 1));
		return name;
	} catch (err) {
		return null;
	}
};

const fetchChactersPage = async profile => {
	const response = await fetch(`https://ru.pathofexile.com/account/view-profile/${profile}/characters`);
	return response.text();
};

const loadActiveNamesByProfiles = async profiles => {
	const profilesWithActiveNames = {};
	await Promise.all(
		profiles.map(async profile => {
			const html = await fetchChactersPage(profile);
			const activeCharacterName = getNameFromHtmlText(html);
			profilesWithActiveNames[profile] = activeCharacterName;
		})
	);

	return profilesWithActiveNames;
};

export const CharacterService = {
	getCharacterInfo,
	loadActiveNamesByProfiles,
};
