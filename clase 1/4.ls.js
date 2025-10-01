const fs = require('node:fs')

// Leer archivos en un directorio

fs.readdir('.', (err, file) => { // Uso '.' para decir que es este mismo directorio
    if (err) {
        console.error(err);
        return;
    }

    console.log(typeof file);
    console.log("Devuelvo en formato de Array: ", file);
    
    console.log("Devuelvo cada uno individual");
    
    file.forEach(file => {
        // Hacer cosas con cada archivo del array
        console.log(file);
        
    })
})