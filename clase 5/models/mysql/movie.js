import mysql from 'mysql2/promise';
import 'dotenv/config'

const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '',
    database: 'moviesdb',
}

// const config = {
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     port: process.env.DB_PORT,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// }

const conn = await mysql.createConnection(config);

export class MovieModel {
    static async getAll({ genre }) {

        // Buscar por género si se proporciona

        const [movies] = await conn.query('SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movies;');
        return movies;

    }

    static async getById({ id }) {
        const [movies] = await conn.query('SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movies WHERE id = UUID_TO_BIN(?);', [id]);

        if (movies.length === 0) return null;
        return movies;
    }

    static async create({ input }) {

        const { title, year, director, duration, poster, rate } = input;

        // todo: crear la conexion de genre

        // crypto.randomUUID()
        const [uuidResult] = await conn.query('SELECT UUID() AS uuid;');
        const [{ uuid }] = uuidResult;

        // Subir la película a la base de datos
        await conn.query(
            `INSERT INTO movies (id, title, year, director, duration, poster, rate) VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?);`,
            [title, year, director, duration, poster, rate]
        );

        // Devolver la película creada
        return {
            id: uuid,
            ...input,
        };
    }

    static async delete({ id }) {
        // todo: eliminar la película de la base de datos
    }

    static async update({ id, input }) {
        // todo: actualizar la película de la base de datos
    }
}