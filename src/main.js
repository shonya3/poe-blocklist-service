import express from 'express';
import cors from 'cors';
import { CharacterService } from './CharacterService.js';
const app = express();
const port = 8000;

app.use(express.json({ limit: '10kb' }));
app.use(cors());
app.options('*', cors());

app.get('/get-items', async (req, res) => {
	const { character, accountName } = req.query;
	const items = await CharacterService.getCharacterInfo(accountName, character);
	res.json(items);
});

app.post('/active-character-names', async (req, res) => {
	try {
		const { profiles } = req.body;
		console.log({ body: req.body });
		if (!profiles) {
			return res.status(400).json({
				status: 'error',
				message: 'Expected profiles array.',
			});
		}
		const names = await CharacterService.loadNames(profiles);
		console.log(names);
		res.status(200).json({
			names,
		});
	} catch (err) {
		console.log('Error', err);
	}
});

app.listen(port, () => {
	console.log('Example app listening on port ', port);
});
