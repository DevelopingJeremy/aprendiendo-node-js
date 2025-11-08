import express from 'express'
import jwt from 'jswonwebtoken';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv/config';
import { UserRepository } from './user-repository.js';

const PORT = process.env.PORT ?? 3000;
const SECRET_KEY = process.env.SECRET_KEY

const app = express()

app.set('view engine', 'ejs')
app.use(express.json());

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await UserRepository.login({ username, password })

        // El jwt tiene (datos, secret key, opciones)
        const token = jwt.sign({ id: user._id, username: user.username}, SECRET_KEY, { expiresIn: '1h' })
        res.status(200).json({ user, token })
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const id = await UserRepository.create({ username, password });
        res.status(201).send({ id });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
})
app.post('/logout', (req, res) => {})

app.get('/protected', (req, res) => {
    res.render('protected', { name: "Jeremito"})
})


app.listen(PORT, () => {
    console.log(`Servidor activo en el puerto: http://localhost:${PORT}`);
})