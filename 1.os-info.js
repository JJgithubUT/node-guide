const os = require('node:os')
console.log('Info del SO:')
console.log('--------------------')

console.log('Nombre del SO: ', os.platform())
console.log('Versión del SO: ', os.release())
console.log('Arquitectura: ', os.arch())
console.log('CPUs: ', os.cpus()) // <--- Podremos escalar procesos de node
console.log('Memoria libre: ', os.freemem() / 1024 / 1024)
console.log('Memoria total: ', os.totalmem() / 1024 / 1024)
console.log('Uptime: ', os.uptime() / 60 / 60)
