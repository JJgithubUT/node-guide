import express, { json } from 'express' // require -> ESModules
import { corsMiddleware } from './middlewares/cors.js'
import { createMovieRouter } from './routes/movies.js'

export const createApp = ({ movieModel }) => {
  const app = express()
  app.use(json())
  app.use(corsMiddleware()) /* { acceptedOrigins: ['http://.....'] } */
  app.disable('x-powered-by') // deshabilitar el header X-Powered-By: Express

  app.use('/movies', createMovieRouter({ movieModel }))

  const PORT = process.env.NODE_GUIDE_PORT ?? 2060

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
}
