/*
readFileSync -> Forma síncrona
readFile -> Forma Asíncrona
*/

const fs = require('node:fs')

console.log('Leyendo el primer archivo ...')
const text = fs.readFile('./archivo.txt')
console.log('primer texto: ', text)

console.log('---> Hacer cosas mientras lee el archivo ...')

console.log('Leyendo 2do archivo ...')
const secondText = fs.readFile('./archivo2.txt')
console .log('segundo texto: ' , secondText)