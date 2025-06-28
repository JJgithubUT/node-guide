const fs = require('node:fs/promises')
const path = require('node:path')
const picocolors = require('picocolors')

const folder = process.argv[2] ?? '.'

console.log(`Argumentos para el programa ''8.ls-advanced'': `)
console.log(process.argv[2] ?? 'sin argumentos, mostrando con folder actual (./)')


async function ls (folder) {
    // Debería de separlo en otra f(x) pero no lo hago
    let files

    // Hacer lo único en el try catch.
    // No envolver la función ls en try
    // para lograr el proceso asincrono
    // en PARALELO, mejora rendimiento.

    try {
        files = await fs.readdir(folder)
    } catch  {
        console.error(picocolors.red(`✖️| No se pudo leer el directorio ${folder}`))
        process.exit(1) // <--- 1 señal correct de un error, 0 no hace nada
    }

    // map es asíncrono, no para proceso en el await de files
    // map es un callback, las mapea todas promesas de golpe (en paralelo)
    const filesPromises = files.map(async file => {
        const filePath = path.join(folder, file)
        let stats

        try {
            stats = await fs.stat(filePath) // status - info. del archivo
        } catch (error) {
            console.error(`No se pudo leer el archivo ${filePath}`)
            process.exit(1)
        }

        const isDirectory = stats.isDirectory()
        const fileType = isDirectory ? `${picocolors.bgYellow('-- D/  ')}` : `${picocolors.bgMagenta('-- F./ ')}`
        const fileSize = stats.size
        const fileModified = stats.mtime.toLocaleString()

        return `${fileType} ${picocolors.blue(file.padEnd(30))} ${picocolors.greenBright(fileSize.toString().padStart(20))} ${picocolors.yellow(fileModified)}`
    })

    const filesInfo = await Promise.all(filesPromises)

    filesInfo.forEach(fileInfo => console.log(fileInfo));

}

ls(folder)

/* fs.readdir(folder)
    .then(files => {
        files.forEach(file => {
            const filePath = path.join(folder, file)
            fs.stat(filePath)
        })
    })
    .catch(err => {
        console.error('Error al leer directorio: ', err)
        return;
    }) */