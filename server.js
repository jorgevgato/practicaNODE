import 'dotenv/config'
import http from 'node:http'
import app from './app.js'


const port = process.env.PORT || 3000

const server = http.createServer(app)

server.on('error', err => console.error(err))
server.on('listening', () => {
    console.log(`Server started on http://localhost:${port}`)
})
server.listen(port)