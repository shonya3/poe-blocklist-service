import express from 'express';
import cors from 'cors';
import { CharacterService } from './CharacterService.js';
const app = express();
const port = 8000;

app.use(express.json({ limit: '10kb' }));
app.use(cors());
app.options('*', cors());

app.post('/active', async (req, res) => {
	try {
		const { profiles } = req.body;
		if (!profiles) {
			return res.status(400).json({
				status: 'error',
				message: 'Expected profiles array.',
			});
		}
		const names = await CharacterService.loadActiveNamesByProfiles(profiles);
		res.status(200).json(names);
	} catch (err) {
		console.log('Error', err);
	}
});

app.post('/info', async (req, res) => {
	try {
		const { profiles } = req.body;
		if (!profiles) {
			return res.status(400).json({
				status: 'error',
				message: 'Expected profiles array.',
			});
		}

		const infos = await CharacterService.loadInfos(profiles);
		res.status(200).json({
			status: 'success',
			data: infos,
		});
	} catch (err) {
		console.log(err);
	}
});

app.listen(port, () => {
	console.log('Example app listening on port ', port);
});
