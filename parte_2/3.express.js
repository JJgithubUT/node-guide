const express = require('express')
const app = express()
// importar api
const ditto = require('./pokemon/ditto.json')
// Desactivar X-Powered-By: Express del Response
// puede ser un peligro de ciberseguridad
app.disable('x-powered-by')
// las cabeceras eliminarlas cuando no aportan

// Puerto
const PORT = process.env.NODE_GUIDE_EXP_PORT ?? 2061

// MIDDLEWARE CORTO
app.use(express.json())

// Uso del MIDDLEWARE (entre petición y respuesta)
/*
app.use((req, res, next) => {
  // Ej. Trackeo de request a db
  // Ej. Chequeo de cookies del usuario
  if (req.method !== 'POST') return next()
  // Solo llegan request POST y header Content-Type: app/json
  if (req.headers['content-type'] !== 'application/json') return next()
  // Programa que era del POST
  let body = ''

  // escuchar el evento data, chunk recibe binarios, es buffer
  req.on('data', chunk => {
    body += chunk.toString()
  })

  req.on('end', () => {
    const data = JSON.parse(body)
    data.timestamp = Date.now()
    // mutar la request y meter la info en el req.body
    req.body = data
    next()
  })
})
 */

app.get('/', (req, res) => {
  /* res.status(200).send('<h1>Página principal by xprss</h1>') */
  /* res.json({ message: 'Hola mundo' }) */
  res.json(ditto)
})

app.post('/pokemon', (req, res) => {
  // req.body guardable en la db
  res.status(201).json(req.body)
})

// Al final el 404
// .use (todos los métodos)
app.use((req, res) => {
  res.status(404).send('<h1>404</h1>')
})

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
