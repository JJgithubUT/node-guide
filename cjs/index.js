/* Forma antigua depreciada de importar sin llaves
const sum = require('./suma') */

/* import sum_js from '../cjs/suma.js'

import { sum_mjs, sub, mult } from './suma.mjs'

console.log(sum_js(666,222))
console.log(sum_mjs(666,222))
console.log(sub(666,222))
console.log(mult(666,222)) */

/* 
.js -> por defecto usa CommonJS
.mjs -> para usar ES Modules
.cjs -> para usar CommonJS
*/


// Common JS require module
const { sum_js } = require('./suma')

console.log(sum_js(1,2))