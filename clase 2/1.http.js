const http = require('http');
const fs = require('node:fs');

const desiredPort = process.env.PORT ?? 0;

const responseApp = (req, res) => {
    if (req.url == '/') {
        res.statusCode = 200;
        // Los headers sirven para definir metadatos de la respuesta
        // En este caso, le decimos al navegador que la respuesta es texto plano
        // y que la codificación de caracteres es UTF-8
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');

        // res.end termina la respuesta y envía el contenido al cliente
        res.end('Hola, mundo!');
    } else if (req.url == '/imagen-chiva.jpg') {
        res.statusCode = 200;

        fs.readFile('./logo.jpg', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain; charset=utf-8')
                res.end(`Error al enviar la imagen: ${err}`)
            } else {
                res.end(data)
                res.setHeader('Content-Type', 'image/jpg');
            }

        })
    }
    else if (req.url == '/contacto') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end('Contacto:');
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end('Página no encontrada');
    }
}

const server = http.createServer(responseApp);

server.listen(desiredPort, () => {
    console.log(`Servidor escuchando en el puerto ${desiredPort}`);
});