const fs = require('node:fs/promises')

const folder = process.argv[2] ?? '.'

console.log(`Argumentos para el programa ''8.ls-advanced'': `)
console.log(process.argv[2] ?? 'sin argumentos, mostrando de folder actual: ')

fs.readdir(folder)
    .then(files => {
        files.forEach(file => {
            console.log(file)
        })
    })
    .catch(err => {
        console.error('Error al leer directorio: ', err)
        return;
    })