import { CharacterInfo } from './types.js';
const getCharacterInfo = async (account: string, character: string) => {
	try {
		const url = new URL('https://www.pathofexile.com/character-window/get-items');
		url.searchParams.append('accountName', account);
		url.searchParams.append('character', character);
		const response = await fetch(url);
		const info = await response.json();
		return info as CharacterInfo;
	} catch (err) {
		return null;
	}
};

const getNameFromHtmlText = (htmlText: string): string | null => {
	try {
		const line = htmlText.split('\n').find(line => line.includes('new C'));
		if (!line) return null;
		const firstBracketIndex = line.indexOf('{');
		const lastBracketIndex = line.indexOf('}');
		const { name } = JSON.parse(line.slice(firstBracketIndex, lastBracketIndex + 1));
		return name;
	} catch (err) {
		return null;
	}
};

const fetchChactersPage = async (profile: string) => {
	const response = await fetch(`https://ru.pathofexile.com/account/view-profile/${profile}/characters`);
	return response.text();
};

const loadActiveNamesByProfiles = async (
	profiles: string[]
): Promise<Array<{ profile: string; activeCharacterName: string | null }>> => {
	const profilesWithActiveNames: Array<{ profile: string; activeCharacterName: string | null }> = [];
	await Promise.all(
		profiles.map(async profile => {
			const html = await fetchChactersPage(profile);
			const activeCharacterName = getNameFromHtmlText(html);
			profilesWithActiveNames.push({
				profile,
				activeCharacterName,
			});
		})
	);

	return profilesWithActiveNames;
};

const loadInfos = async (profiles: string[]): Promise<Array<{ profile: string; info: CharacterInfo | null }>> => {
	const profilesWithActiveNames = await CharacterService.loadActiveNamesByProfiles(profiles);
	const results: {
		profile: string;
		info: CharacterInfo | null;
	}[] = [];
	const promises = profilesWithActiveNames.map(async ({ profile, activeCharacterName }) => {
		const info = await getCharacterInfo(profile, activeCharacterName!);
		results.push({ profile, info });
	});

	await Promise.all(promises);
	return results;
};

export const CharacterService = {
	getCharacterInfo,
	loadActiveNamesByProfiles,
	loadInfos,
};
