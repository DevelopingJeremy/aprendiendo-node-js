// En node JS no existe Window por que corre en un entorno de servidor

// globalThis es la variable donde se encuentra TODAS las funciones globales de JS (Console, math, Promies, etc)

/*
    Patron de diseño recomendado de NODE (Modulo)

    ¿Por que?
    - Para organizar mejor el codigo y no tener todo en un fichero, modularizarlo

    El mas usado es Common JS, manera mas antigua pero que aun se usa
*/

//* CommonJS require Module (obsoleto) usa require
const math = require("./math")

// llamamos la funcion, math es un objeto que habiamos exportado por eso podemos acceder a sus funciones
console.log(math.suma(1,2));

// CommonJS trabaja con .js o .cjs para forzar el CommonJS, lo mejor es usar ES Modules (EcmaScript Modules)