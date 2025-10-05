const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const pokemon = require('./pokemon/pokemon.json')

const desiredPort = process.env.PORT ?? 0;

function processRequest(req, res) {
    const { url, method } = req;

    switch (method) {
        case 'GET':
            switch (url) {
                case '/':
                    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
                    return res.end('Bienvenido a /, el index de esta API')

                case '/pokemon/ditto':
                    res.setHeader('Content-Type', 'application/json; charset=utf-8')
                    return res.end(JSON.stringify(pokemon))

                case '/contact':
                    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
                    return res.end('Bienvenido a /contact, mi correo es: quesadajeremy7@gmail.com')

                default:
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
                    return res.end('404 Not Found')
            }

        case 'POST':
            switch (url) {
                case '/pokemon': {
                    let body = '';
                    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
                    req.on('data', chunk => {
                        body += chunk.toString()
                    });

                    req.on('end', () => {
                        const data = JSON.parse(body);

                        // Llamar a la base de datos

                        res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' });
                        res.end(JSON.stringify({
                            message: 'Pokemon creado exitosamente',
                            data
                        }));
                    });
                }
                    break;
                default:
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
                    return res.end('404 Not Found')
            }
        break;

        default:
            res.statusCode = 405;
            res.setHeader('Content-Type', 'text/plain; charset=utf-8')
            res.end('Errorcito, método no permitido');
            break;
    }
}

const server = http.createServer(processRequest);

server.listen(desiredPort, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});