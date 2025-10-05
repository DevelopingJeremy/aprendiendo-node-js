const express = require('express');
const app = express();
const PORT = process.env.PORT ?? 3000;

// Convertir todo el body que viene de JSON a un objeto JS
app.use(express.json());

const dittoJson = require('./pokemon/pokemon.json')

app.use((req, res, next) => {
    console.log(`${req.method} - ${req.url}`);
    next();
});

app.use((req, res, next) => {
    if (req.method !== 'POST') return next();
    if (req.headers['Content-Type'] !== 'application/json') return next();

    // Solo para peticiones POST con Content-Type application/json
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString()
    });

    req.on('end', () => {
        const data = JSON.parse(body);
        // Llamar a la base de datos

        // Mutar la respuesta y guardarla en el body
        req.body = data;
        next();
    });
});

app.disable('x-powered-by');

app.get('/', (req, res) => {
    res.send('Mi pagina');
});

app.get('/pokemon/ditto', (req, res) => {
    res.send(dittoJson);
});

app.post('/pokemon', (req, res) => {
    res.status(201).json(req.body);
});

app.use((req, res) => {
    res.status(404).send('No encontrado');
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});