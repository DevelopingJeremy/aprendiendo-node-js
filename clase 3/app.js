const express = require('express');
const app = express();
const PORT = process.env.PORT || 0;
const http = require('http');

// Middlewares Basicos
app.use(express.json());
app.disable('x-powered-by');



const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hola, mundo!\n');
});

server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});