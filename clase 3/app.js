const express = require('express');
const app = express();
const crypto = require('node:crypto');
const PORT = process.env.PORT || 3000;
const movies = require('./movies.json');
const movieSchema = require('./schemas/movies');
const cors = require('cors');
const { ca } = require('zod/v4/locales');

app.use(express.json());
app.disable('x-powered-by');
app.use(cors({
    origin: (origin, callback) => {
        // Permitir solicitudes sin origen (como Postman o curl)
        if (!origin) return callback(null, true);
        const ACCEPTED_ORIGINS = [
            'http://localhost:3000',
            'http://localhost:1234',
            'http://127.0.0.1:5500'
        ];
        if (ACCEPTED_ORIGINS.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error('Origen no permitido por CORS'));
        }
    }
}));
app.get('/', (req, res) => {
    res.json({"message": 'Bievenido a mi Home API'});
});
app.get('/movies', (req, res) => {

    const { genre } = req.query;

    if (genre) {
        const moviesFiltered = movies.filter(
            m => m.genre.some(g => g.toLowerCase() === genre.toLowerCase())
        );
        return res.status(200).json(moviesFiltered);
    }

    res.status(200).json(movies);
});

app.get('/movies/:id', (req, res) => {
    const { id } = req.params;
    const movie = movies.find(m => m.id === Number(id));

    if (movie) res.status(200).json(movie);
    else res.status(404).json({ error: 'Pelicula no encontrada' });
});

app.post('/movies', (req, res) => {
    const {
        title,
        year,
        director,
        duration,
        genre,
        rate
    } = req.body;

    const result = movieSchema.validateMovie(req.body);

    if (result.success === false) {
        return res.status(400).json({
            error: 'Error en la validación de los datos',
            details: JSON.parse(result.error.message)
        });
    }

    const newMovie = {
        id: crypto.randomUUID(),
        ...result.data
    };

    // Esto no es REST, porque estamos modificando un recurso en memoria
    movies.push(newMovie);

    res.status(201).json(newMovie);
});


app.patch('/movies/:id', (req, res) => {
    const { id } = req.params;

    // Validar datos
    const result = movieSchema.validatePartialMovie(req.body);

    if (!result.success) {
        return res.status(400).json({
            error: 'Error en la validación de los datos',
            details: JSON.parse(result.error.message)
        });
    }

    const movieIndex = movies.findIndex(m => m.id === id);

    if (movieIndex === -1) {
        return res.status(404).json({ error: 'Pelicula no encontrada' });
    }

    const updatedMovie = {
        ...movies[movieIndex], // Lo que ya tenia la pelicula en si
        ...result.data // Lo nuevo actualizado sobreescribe lo anterior
    }

    movies[movieIndex] = updatedMovie

    return res.json(updatedMovie)
});

app.delete('/movies/:id', (req, res) => {


    const { id } = req.params;
    const movieIndex = movies.findIndex(m => m.id === id);

    if (movieIndex === -1) {
        return res.status(404).json({ error: 'Pelicula no encontrada' });
    }

    // Esto no es REST, porque estamos modificando un recurso en memoria
    movies.splice(movieIndex, 1);

    res.status(204).json({'message': 'Pelicula eliminada'});
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
