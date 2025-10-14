const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const movies = require('./movies.json');

app.use(express.json());
app.disable('x-powered-by');

app.get('/', (req, res) => {
    res.send('Hola mundo');
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

    const newMovie = {
        id: crypto.randomUUID(),
        title,
        year,
        director,
        duration,
        genre,
        rate: rate ?? 0
    };

    // Esto no es REST, porque estamos modificando un recurso en memoria
    movies.push(newMovie);

    res.status(201).json(newMovie);
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
