const z = require('zod');

const movieSchema = z.object({
    title: z.string({
        required_error: 'El título es obligatorio',
        invalid_type_error: 'El título debe ser una cadena de texto'
    }),
    year: z.number().int().min(1888).max(new Date().getFullYear()),
    director: z.string(),
    duration: z.number().int().positive(),
    genre: z.array(z.enum(['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'Sci-Fi', 'Crime', 'Romance'])).min(1),
    rate: z.number().min(0).max(10).default(0)
});

function validateMovie(object) {
    return movieSchema.safeParse(object);
}

function validatePartialMovie (object) {
    // partial() puede servirnos para solo validar lo que se pase, como cuando usamos PATCH
    return movieSchema.partial().safeParse(object)
}

module.exports = {
    validateMovie,
    validatePartialMovie
};