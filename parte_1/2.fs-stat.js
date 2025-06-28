const fs = require('node:fs') // a partir de Node 16, se recomienda poner node:...

const stats = fs.statSync('./archivo.txt')

/* Si es ...
un fichero
directorio
enlace simbólico
tamaño en bytes
*/
console.log(`
    stats.isFile?: ${stats.isFile()}
    stats.isDirectory?: ${stats.isDirectory()}
    stats.isSymbolicLink?: ${stats.isSymbolicLink()}
    stats.size?: ${stats.size}
`)