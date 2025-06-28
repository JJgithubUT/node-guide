// Solo en modulos nativos que no tienen promesas nativas
/* const fs = require('node:fs') // No tan recomendable solo si la versión falla
const { promisify } = require('util')
const readFilePromise = promisify(fs.readFile) */


import { readFile } from 'node:fs/promises'

Promise.all([
    readFile('./archivo.txt', 'utf-8'),
    readFile('./archivo2.txt', 'utf-8')
]).then(([text, secondText]) => {
    console.log('primer texto: ', text),
    console.log('segundo texto: ', secondText)
})