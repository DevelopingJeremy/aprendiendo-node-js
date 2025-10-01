//* Objeto os pero con ES Modules

// Para saber del sistema operativ
import { platform, release, arch, cpus, freemem, totalmem, uptime as _uptime } from 'node:os'; // Lo recomendable para importar modulos es usar node:
import { uptime } from 'node:process';

console.log("Nombre del sistema operativo ", platform());
console.log("Version del sistema operativo", release());
console.log("Arquitectura", arch());
console.log("CPUs", cpus()); // <== Con esto podemos escalar mas el codigo dependiendo de lo que soporte el sistema
console.log("Memoria libre", freemem());
console.log("Memoria total", totalmem());
console.log("Tiempo encendido del ordenador en segundos", _uptime());