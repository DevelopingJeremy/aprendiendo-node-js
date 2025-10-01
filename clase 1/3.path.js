// Sirve para trabajar con rutas de archivos y directorios
// De manera que podemos crear rutas de manera dinámica y segura
// unir rutas, obtener la extensión de un archivo, el nombre del archivo, etc.
// unir rutas con path.join

const path = require("node:path")

console.log(path.sep) // Muestra el separador de rutas del sistema operativo
// En Windows es \ y en Unix es /

// Unir rutas
const rutaCompleto = path.join('contenido', 'subcarpeta', 'archivo.txt')
console.log(rutaCompleto)

// Nombre del fichero
const nombreArchivo = path.basename(rutaCompleto)
console.log(nombreArchivo)

// Fichero sin extensión
const nombreSinExtension = path.basename(rutaCompleto, '.txt')
console.log(nombreSinExtension)

// Extensión del fichero
const extension = path.extname(rutaCompleto)
console.log(extension)