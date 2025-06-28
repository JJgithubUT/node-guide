const http = require('node:http')
const { findAvailablePort } = require('./10.free-port')

const desiredPort = process.env.NODE_GUIDE_PORT ?? 2060

// Un callback gestiona request y responses
const server = http.createServer((req, res) => {
    console.log('request received')
    res.end('Hola mundo')
})

findAvailablePort(desiredPort).then(port => {
    server.listen(port, () => {
        console.log(`server listening on port http://localhost:${port}`)
    })
})

/* server.listen(0, () => {
    console.log(`server listening on port http://localhost:${server.address().port}`)
}) */

/* 
// Bajo estándard propio TK-0001
server.listen(2060, () => {
    console.log('server listening on port 2060')
})
*/