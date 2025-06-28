/*
readFileSync -> Forma síncrona
readFile -> Forma Asíncrona
*/


// Solo en modulos nativos que no tienen promesas nativas
/* const fs = require('node:fs') // No tan recomendable solo si la versión falla
const { promisify } = require('util')
const readFilePromise = promisify(fs.readFile) */


const fs = require('node:fs/promises') // 'node:fs/promises' <- El más recomendado

// Promesas nativas  'node:fs/promises' <- El más recomendado
console.log('Leyendo el primer archivo ...')
fs.readFile('./archivo.txt', 'utf-8')
    .then(text => {
        console.log('primer texto: ', text)
    })

console.log('---> Hacer cosas mientras lee el archivo ...')

console.log('Leyendo 1er archivo ...')
fs.readFile('./archivo2.txt', 'utf-8')
    .then(text => {
        console.log('segundo texto: ', text)
    })