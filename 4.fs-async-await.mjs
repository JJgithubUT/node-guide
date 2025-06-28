// Solo en modulos nativos que no tienen promesas nativas
/* const fs = require('node:fs') // No tan recomendable solo si la versión falla
const { promisify } = require('util')
const readFilePromise = promisify(fs.readFile) */


import { readFile } from 'node:fs/promises'

console.log('Leyendo el primer archivo ...')
const text = await readFile('./archivo.txt', 'utf-8')
console.log('primer texto: ', text)


console.log('---> Hacer cosas mientras lee el archivo ...')

console.log('Leyendo 2do archivo ...')
const secondText = await readFile('./archivo2.txt', 'utf-8')
console.log('segundo texto: ', secondText)