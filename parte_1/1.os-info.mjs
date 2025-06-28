import { platform, release, arch, cpus, freemem, totalmem, uptime } from 'node:os'

console.log('Info del SO:')
console.log('--------------------')

console.log('Nombre del SO: ', platform())
console.log('Versión del SO: ', release())
console.log('Arquitectura: ', arch())
console.log('CPUs: ', cpus()) // <--- Podremos escalar procesos de node
console.log('Memoria libre: ', freemem() / 1024 / 1024)
console.log('Memoria total: ', totalmem() / 1024 / 1024)
console.log('Uptime: ', uptime() / 60 / 60)
