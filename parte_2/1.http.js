const http = require('node:http')
const fs = require('node:fs')

const desiredPort = process.env.NODE_GUIDE_PORT ?? 2060

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')

  if (req.url === '/') {
    res.end('<h1>Mi página</h1>')
  } else if (req.url === '/img') {
    // data es buffer en binario, se transforma con image/png para interpretar el navegador
    fs.readFile('./imgs/duck.jpg', (err, data) => {
      if (err === 500) {
        res.statusCode = 500
        res.end('<h1>500 Internal server error</h1>')
      } else {
        res.setHeader('Content-Type', 'image/jpeg')
        res.end(data)
      }
    })
  } else if (req.url === '/contacto') {
    res.end('<h1>Contacto</h1>')
  } else {
    res.statusCode = 404
    res.end('<h1>No encontrado 404</h1>')
  }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`Server listening on port https://localhost:${desiredPort}`)
})
