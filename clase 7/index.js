import express from 'express'
import { UserRepository } from './user-repository.js';

const PORT = process.env.PORT ?? 3000;

const app = express()

app.set('view engine', 'ejs')
app.use(express.json());

app.get('/', (req, res) => {
    res.render('index', { name: 'Jeremito'})
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await UserRepository.login({ username, password })
        res.status(200).json({ user })
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

app.post('/protected', (req, res) => {})


app.listen(PORT, () => {
    console.log(`Servidor activo en el puerto: http://localhost:${PORT}`);
})