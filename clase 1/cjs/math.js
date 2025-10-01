function suma(a, b) {
    return a + b;
}

function resta(a, b) {
    return a-b;
}

// Con esto exportamos las funciones y las podemos llamar desde otro archivo con CommonJS
module.exports = {
    suma, resta
}