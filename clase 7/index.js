import express from 'express'

const PORT = process.env.PORT ?? 3000;

const app = express()

app.get('/', (req, res) => {
    res.send("<h1>Hola</h1>")
})

app.listen(PORT, () => {
    console.log(`Servidor activo en el puerto: http://localhost:${PORT}`);
})