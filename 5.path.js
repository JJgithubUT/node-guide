const path = require('node:path');

// unir rutas con path.join
// --> unix /
// --> windows \

// ver barra separadora de carpetas según el SO
console.log(path.sep)

// unir rutas con path.join
const filePath = path.join('content', 'subfolder', 'test.txt')
// `/content/subfolder/test.txt` linux
console.log(filePath)

// obtener nombre de un archivo (fichero)
const base = path.basename('/tmp/midu-secret-files/password.txt')
console.log(base)

// obtener nombre de un archivo (fichero) sin extensión
const filename = path.basename('/tmp/midu-secret-files/password.txt')
console.log(filename)

// obtener la extensión de un archivo (fichero)
const extension = path.extname('immage.jpg')
console.log(extension)