import express, { json } from 'express';
const app = express();
const PORT = process.env.PORT || 3000;
import { readJSON } from './utils.js';
import {moviesRouter} from './routes/movies.js';
import { corsMiddleware } from './middlewares/cors.js';

// Como leer un JSON en ESM
// import fs from 'node:fs';
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'));

// Otra manera
// import movies from './movies.json' with { type: 'json' };

const movies = readJSON('./movies.json');
app.use(json());
app.use(corsMiddleware());
app.disable('x-powered-by');

// Peliculas
app.use('/movies', moviesRouter);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
