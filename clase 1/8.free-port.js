const net = require('node:net');

function findAvailablePort(port) {
    return new Promise((resolve, reject) => {
        const server = net.createServer()

        server.listen(port, () => {
            const { port } = server.address()
            server.close(() => {
                resolve(port)
            })
        })

        server.on('error', err => {
            if (err.code == 'EADDRINUSE') {
                findAvailablePort(0).then(newPort => resolve(newPort))
            } else {
                reject(err)
            }
        })
})}

module.exports = {findAvailablePort}

// instrucciones a seguir para hacer el findAvailablePort
// solo en comentarios para ver el flujo
// Usar net.createServer() para crear un servidor TCP
// Intentar escuchar en el puerto especificado
// Si el servidor escucha correctamente, significa que el puerto está disponible
// En el callback de server.listen, cerrar el servidor y resolver la promesa con el puerto
// Si ocurre un error (por ejemplo, si el puerto ya está en uso), manejar el evento 'error' del servidor
// En el manejador de errores, rechazar la promesa con el error