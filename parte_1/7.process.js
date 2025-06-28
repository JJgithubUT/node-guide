// process
/*
Objeto global, da info y control
sobre el proceso actual de ejecución.
Propiedades y métodos que permiten 
inteeractuar con el entorno de ejec de node
y dan información relacionada al proc. actual.
*/

// Argumentos de entrada
console.log(process.argv)

//current working directory => desde donde estamos trabajando
console.log(process.cwd())

// platform (variables de entorno(PEPITO))
console.log(process.env.PEPITO)

// Controlar el proceso y su salida
process.exit()

// Podemos controlar eventos del proceso
process.on('exit', () => {
    // limpiar recursos
})