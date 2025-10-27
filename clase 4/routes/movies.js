import Router from 'express';
import { randomUUID } from 'node:crypto';
import { validateMovie, validatePartialMovie } from '../schemas/movies.js';
import { readJSON } from '../utils.js';

const movies = readJSON('./movies.json');
export const moviesRouter = Router();

moviesRouter.get('/', (req, res) => {
        const { genre } = req.query;

    if (genre) {
        const moviesFiltered = movies.filter(
            m => m.genre.some(g => g.toLowerCase() === genre.toLowerCase())
        );
        return res.status(200).json(moviesFiltered);
    }

    res.status(200).json(movies);
});

moviesRouter.get('/:id', (req, res) => {
        const { id } = req.params;
    const movie = movies.find(m => m.id === Number(id));

    if (movie) res.status(200).json(movie);
    else res.status(404).json({ error: 'Pelicula no encontrada' });
});

moviesRouter.post('/', (req, res) => {
        const {
        title,
        year,
        director,
        duration,
        genre,
        rate
    } = req.body;

    const result = validateMovie(req.body);

    if (result.success === false) {
        return res.status(400).json({
            error: 'Error en la validación de los datos',
            details: JSON.parse(result.error.message)
        });
    }

    const newMovie = {
        id: randomUUID(),
        ...result.data
    };

    // Esto no es REST, porque estamos modificando un recurso en memoria
    movies.push(newMovie);

    res.status(201).json(newMovie);
});

moviesRouter.patch('/:id', (req, res) => {
        const { id } = req.params;

    // Validar datos
    const result = validatePartialMovie(req.body);

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

moviesRouter.delete('/:id', (req, res) => {
        const { id } = req.params;
    const movieIndex = movies.findIndex(m => m.id === id);

    if (movieIndex === -1) {
        return res.status(404).json({ error: 'Pelicula no encontrada' });
    }

    // Esto no es REST, porque estamos modificando un recurso en memoria
    movies.splice(movieIndex, 1);

    res.status(204).json({'message': 'Pelicula eliminada'});
});

export default moviesRouter;