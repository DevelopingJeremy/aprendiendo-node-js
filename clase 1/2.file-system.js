//* File System

const fs = require('node:fs'); // File System

//* Fs Stats

// Obtiene estadisticas sobre un archivo en concreto
const stats = fs.statSync('./archivo.txt')

console.log(
    stats.isFile(), // Si es un fichero (Documento)
    stats.isDirectory(), // Si es un directorio (Carpeta)
    stats.isSymbolicLink(), // Si es un enlace simbolico (Enlace directo)
    stats.size // Tamaño en bytes
)


//* Fs Read files

/** Lectura de archivos
 * Hay varias formas de leer archivos en node.js
 * 
 * 1. Sincrona - fs.readFileSync(ruta, encoding)
 * 2. Asincrona con callbacks - fs.readFile(ruta, encoding, callback)
 * 3. Asincrona con promesas - fs.promises.readFile(ruta, encoding) o require('node:fs/promises')
 * 4. Convertir de callback a promesa - util.promisify(fs.readFile)
 * 5. Async/Await - Usando cualquiera de las formas asincronas anteriores dentro de una funcion async
 * 6. Pararelo - Usando Promise.all con cualquiera de las formas asincronas anteriores
 */

//? Sincronia
// Esto trabaja de forma sincrona, lo que significa que ira haciendo un proceso a la vez,
// no ejecuta "haciendo cosas" antes de leer el archivo porque hassta que una tarea no termine no hace la otra

console.log("Leyendo primer archivo...");
const texto = fs.readFileSync('./archivo.txt', 'utf-8')

console.log(texto);

console.log("Haciendo cosas mientras lee el archivo");

// --------------------------------------

console.log("Leyendo segundo archivo...");
const texto2 = fs.readFileSync('./archivo2.txt', 'utf-8')

console.log(texto2);

//? Asincronia con callbacks
// La asincronia la podemos manejar por medio de callbacks, promesas o async/await
// Esto trabaja de forma asincrona, lo que significa que puede ejecutar "haciendo cosas" mientras lee el archivo

console.log("Leyendo primer archivo...");
fs.readFile('./archivo.txt', 'utf-8', (err, texto) => {
    console.log("Primer texto: ", texto);
})

console.log("Haciendo cosas mientras lee el archivo");

// --------------------------------------

console.log("Leyendo segundo archivo...");
fs.readFile('./archivo2.txt', 'utf-8', (err, texto) => {
    console.log("Segundo texto: ", texto);
})

//? Asincronia con promesas
// Desde node 10 podemos usar promesas con el modulo fs
const fsPromises = require('node:fs/promises');

console.log("Leyendo primer archivo con promesas...");
fsPromises.readFile('./archivo.txt', 'utf-8')
    .then(texto => console.log("Primer texto con promesas: ", texto))
    .catch(err => console.error("Error leyendo primer archivo con promesas: ", err));

console.log("Haciendo cosas mientras lee el archivo");

// --------------------------------------

console.log("Leyendo segundo archivo con promesas...");
fsPromises.readFile('./archivo2.txt', 'utf-8')
    .then(texto => console.log("Segundo texto con promesas: ", texto))
    .catch(err => console.error("Error leyendo segundo archivo con promesas: ", err));


//? Convertir de callback a promesa
// Podemos convertir una funcion que use callbacks en una que use promesas con el metodo util.promisify
const { promisify } = require('node:util');
const readFilePromise = promisify(fs.readFile); // Usamos una funcion que necesita callback y la convertimos en una que devuelve promesa

console.log("Leyendo primer archivo con callback convertido a promesa...");
readFilePromise('./archivo.txt', 'utf-8')
    .then(texto => console.log("Primer texto con callback convertido a promesa: ", texto))
    .catch(err => console.error("Error leyendo primer archivo con callback convertido a promesa: ", err));

//? Async/Await

// Si usamos ES Modules podemos usar top-level await - significa que podemos usarlo sin estar dentro de una funcion async (en la raiz del archivo)
// Si usamos CommonJS (require) debemos usar async/await dentro de una funcion async

//! IIFE - Immediately Invoked Function Expression

// El punto y coma es para evitar errores si el archivo anterior no acaba en salto de linea
// y el interprete de JS lo interpreta como una llamada a funcion
// Es una buena practica ponerlo cuando se usan IIFE
; (async () => {
    try {
        console.log("Leyendo primer archivo con async/await...");
        const texto = await fsPromises.readFile('./archivo.txt', 'utf-8');
        console.log("Primer texto con async/await: ", texto);
    } catch (err) {
        console.error("Error leyendo primer archivo con async/await: ", err);
    }
})();

//? Pararelo
// Si queremos leer varios archivos en paralelo podemos usar Promise.all

Promise.all([
    fsPromises.readFile('./archivo.txt', 'utf-8'),
    fsPromises.readFile('./archivo2.txt', 'utf-8')
])
    .then(([texto1, texto2]) => {
        console.log("Texto 1 con Promise.all: ", texto1);
        console.log("Texto 2 con Promise.all: ", texto2);
    })

