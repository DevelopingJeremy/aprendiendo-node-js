//ES Modules (Ecma Script modules) - Mejor y mas usado, en vez de usar require usa import

// En este caso se usa la extension .mjs para que node lo reconozca como un modulo
// Tambien se puede usar "type": "module" en el package.json para que reconozca todos los archivos .js como modulos

import {suma, resta} from './math.mjs'

console.log(suma(1, 2));
console.log(resta(5,2));