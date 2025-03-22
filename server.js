import express from 'express'
import http from 'node:http'

const app = express()

app.get('/', (req, res, next) => {
    res.send('Connected and well')
})

const server = http.createServer(app)

server.listen(3000)