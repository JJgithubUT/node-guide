function sum_js (a,b) {
    return a + b
}


//Forma antigua depreciada de exportar
/* module.exports = sum_js */

// CommonJS Module Export - forma moderna de exportar
module.exports = {
    sum_js
}