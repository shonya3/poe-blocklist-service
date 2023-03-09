import express from 'express';
import cors from 'cors';
import { CharactersController } from './CharactersController.js';
const app = express();
const port = 8000;

app.use(express.json({ limit: '10kb' }));
app.use(cors());
app.options('*', cors());

app.post('/active', CharactersController.active);
app.post('/info', CharactersController.info);

app.listen(port, () => {
	console.log('Example app listening on port ', port);
});
