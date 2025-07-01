const http = require('node:http')

// commonJS -> modulos
const dittoJSON = require('./pokemon/ditto.json')

const processRequest = (req, res) => {
  const { method, url } = req

  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          return res.end(JSON.stringify(dittoJSON))
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('<h1>404</h1>')
      }
    case 'POST':
      switch (url) {
        case '/pokemon': {
          let body = ''
          // escuchar el evento data, chunk recibe binarios, es buffer
          req.on('data', chunk => {
            body += chunk.toString()
          })
          req.on('end', () => {
            const data = JSON.parse(body)
            // llamada a una database para guardar la info
            res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' }) // cuando haz creado el recurso (201)
            res.end(JSON.stringify(data))
          })
          break
        }
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('404 not found')
      }
  }
}

const server = http.createServer(processRequest)

const port = 2061

server.listen(port, () => {
  console.log(`server listening on oport http://localhost:${port}`)
})
