import express from 'express';
import cors from 'cors';
import { CharacterService } from './CharacterService.js';
const app = express();
const port = 8000;

app.use(cors());
app.options('*', cors());

app.get('/get-items', async (req, res) => {
	const { character, accountName } = req.query;
	const items = await CharacterService.getCharacterInfo(accountName, character);
	res.json(items);
});

app.listen(port, () => {
	console.log('Example app listening on port ', port);
});
