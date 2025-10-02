// ls hace referencia al comando de linux que lista los archivos en un directorio

const fs = require('node:fs').promises

// Leer archivos en un directorio

// fs.readdir('.', (err, file) => { // Uso '.' para decir que es este mismo directorio
//     if (err) {
//         console.error(err);
//         return;
//     }

//     console.log(typeof file);
//     console.log("Devuelvo en formato de Array: ", file);
    
//     console.log("Devuelvo cada uno individual");
    
//     file.forEach(file => {
//         // Hacer cosas con cada archivo del array
//         console.log(file);
        
//     })
// })



// ls advanced

const path = require('node:path');

const folder = process.argv[2] ?? '.'

async function ls (folder) {
    let files

    try {
        files = await fs.readdir(folder);
    } catch (err) {
        console.error("Error al leer el directorio", folder, err);
        process.exit(1)
    }

    const filesPromises = files.map(async file => {
        const pathFile = path.join(folder, file);
        let stats;
        try {
            stats = await fs.stat(pathFile)
        } catch {
            console.error(`Error al obtener estadisticas de ${pathFile}`);
            process.exit(1)
        }

        const isDirectory = stats.isDirectory();
        const fileType = isDirectory ? 'd' : 'f';
        const fileSize = stats.size.toString();
        const lastModified = stats.mtime.toLocaleString();

        return `${fileType} ${pathFile.padEnd(35)} ${fileSize} ${lastModified}`
    })

    const filesInfo = await Promise.all(filesPromises);

    filesInfo.forEach(statFile => {
        console.log(statFile);
    });
}


ls(folder);
// f carpeta/archivo size modified