//* Objeto os

// Para saber del sistema operativo
//? const os = require('os');
const os = require('node:os'); // Lo recomendable para importar modulos es usar node:
const { uptime } = require('node:process');

console.log("Nombre del sistema operativo ", os.platform());
console.log("Version del sistema operativo", os.release());
console.log("Arquitectura", os.arch());
console.log("CPUs", os.cpus()); // <== Con esto podemos escalar mas el codigo dependiendo de lo que soporte el sistema
console.log("Memoria libre", os.freemem());
console.log("Memoria total", os.totalmem());
console.log("Tiempo encendido del ordenador en segundos", os.uptime());