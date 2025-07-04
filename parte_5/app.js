import express, { json } from 'express' // require -> ESModules
import { corsMiddleware } from './middlewares/cors.js'
import { moviesRouter } from './routes/movies.js'

// leer json con commonJS
/* import fs from 'node:fs'
const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8')) */

const app = express()
app.use(json())
app.use(corsMiddleware()) /* { acceptedOrigins: ['http://.....'] } */
app.disable('x-powered-by') // deshabilitar el header X-Powered-By: Express

app.use('/movies', moviesRouter)

const PORT = process.env.NODE_GUIDE_PORT ?? 2060

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
