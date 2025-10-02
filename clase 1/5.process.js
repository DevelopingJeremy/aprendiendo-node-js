// El objeto process en Node.js es una instancia que nos muestra informacion
// sobre el proceso que se ejecuta en el SO (El proceso es Node.js)

// Ver argumentos de entrada
console.log(process.argv);

// Detener proceso
// process.exit(0); // Esto detiene NODE en si
// Si lo devolvemos con un numero diferente a 0, se considera que hubo un error

// Manejar eventos - Este evento se ejecuta apenas termina el proceso, puedo escribirlo en cualquier 
// parte que queda esperando no es necesario tenerlo despues del evento
process.on('exit', (codigo_de_salida) => { // Podemos manejar el evento dependiendo de la salida
    console.log('El proceso ha terminado con el codigo: ', codigo_de_salida);
});

// Los eventos que hay son muchos, podemos verlos en la documentacion oficial

// Ver el direcctorio desde donde se ejecuta el proceso, no donde esta el archivo
// Si quiero ver donde esta el archivo uso __dirname
console.log(process.cwd());
console.log('hola');

// Ver variables de entorno
console.log(process.env);

/* Las variables de entorno son variables del sistema operativo que se pueden utilizar en la aplicacion
    Podemos crear nuestras propias variables de entorno por ejemplo
    DB_HOST=localhost y la llamamos con process.env.DB_HOST
*/

// Ver version de node
console.log(process.version);

// Ver plataforma
console.log(process.platform); // darwin, win32, linux