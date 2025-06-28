/* Comando ls para ver archivos en carpetas */


// Sin try catch
const fs = require('node:fs')


fs.readdir('.', (err, files) => {
    if (err) {
        console.log('Error al leer el directorio: ', err)
        return;
    }

    files.forEach(file => {
        console.log(file)
    })
})

// con try catch
const fs = require('node:fs/promises')


fs.readdir('.')
    .then(files => {
        files.forEach(file => {
            console.log(file)
        })
    })
    .catch(err => {
        console.error('Error al leer directorio: ', err)
        return;
    })




// fs.stat('content') muestra si existe o no, si error, pues no existe