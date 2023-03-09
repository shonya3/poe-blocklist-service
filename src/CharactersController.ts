import { RequestHandler } from 'express';
import { CharacterService } from './CharacterService.js';

const active: RequestHandler = async (req, res) => {
	try {
		const { profiles } = req.body;
		if (!profiles) {
			return res.status(400).json({
				status: 'error',
				message: 'Expected profiles array.',
			});
		}
		const names = await CharacterService.loadActiveNamesByProfiles(profiles);
		res.status(200).json({
			status: 'success',
			data: names,
		});
	} catch (err) {
		console.log('Error', err);
	}
};

const info: RequestHandler = async (req, res) => {
	try {
		const { profiles } = req.body;
		if (!profiles) {
			return res.status(400).json({
				status: 'error',
				message: 'Expected profiles array.',
			});
		}

		const infos = await CharacterService.loadInfos(profiles);
		return res.status(200).json({
			status: 'success',
			data: infos,
		});
	} catch (err) {
		console.log(err);
	}
};

export const CharactersController = { active, info };
