// Levantar un servidor

const http = require('node:http')

const server = http.createServer((req, res) => {
    console.log('Nuevo request');
    res.end('Hola mundo');
})

const { findAvailablePort } = require('./8.free-port.js')

findAvailablePort(3000).then(port => {
    server.listen(port, () => {
        console.log(`Escuchando en http://localhost:${port}`);
    })
})

// En el navegador no llegan los console.log del servidor

// Si usamos 0, el sistema operativo asigna un puerto libre automáticamente
// server.listen(3000, () => {
server.listen(0, () => {
    console.log(`Servidor escuchando en http://localhost:${server.address().port}`); // server.address() devuelve un objeto con la info del servidor
});

// Esto no es recomendable en producción, es solo para desarrollo
// porque cada vez que reiniciemos el servidor, puede cambiar el puerto
// y tendríamos que estar actualizando la URL en el navegador
// Para producción es mejor usar un puerto fijo como el 3000, 8080, etc.

