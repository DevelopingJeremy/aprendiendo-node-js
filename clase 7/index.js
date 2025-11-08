import express from 'express'
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv/config';
import { UserRepository } from './user-repository.js';

const PORT = process.env.PORT ?? 3000;
const SECRET_KEY = process.env.SECRET_KEY

const app = express()

app.set('view engine', 'ejs')
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
    const token = req.cookies.jwt_token;

    req.session = {
        user: null
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY)
        req.session.user = decoded;
    } catch (error) {}

        next();

})


app.get('/', (req, res) => {
    const { user } = req.session
    res.render('index', user)
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await UserRepository.login({ username, password })

        // El jwt tiene (datos, secret key, opciones)
        const token = jwt.sign({ id: user._id, username: user.username }, SECRET_KEY, { expiresIn: '1h' })
        res
            .cookie('jwt_token', token,
                {
                    httpOnly: true, // La cookie no es accesible desde JavaScript solo desde el server
                    secure: false, // Solo se envia la cookie por HTTPS
                    sameSite: 'strict', // Solo se accede desde el mismo dominio
                    maxAge: 3600000 // 1 hora
                }
            )
            .status(200)
            .send({ user, token })
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

app.post('/logout', (req, res) => {
    res
    .clearCookie('jwt_token')
    .json({ message: "Logout succesful"})
})

app.get('/protected', (req, res) => {
    res.render('protected', { name: req.session.user.username })
})


app.listen(PORT, () => {
    console.log(`Servidor activo en el puerto: http://localhost:${PORT}`);
})