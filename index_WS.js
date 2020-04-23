const cors = require('cors')
const http = require('http')
const socketio = require('socket.io')
const express = require('express')

const app = express()
const server = http.createServer(app)


app.use(cors())
app.use(express.json())

const io = socketio(server)

io.on('connection', (client)=>{
    console.log('New Client')
    client.on('message', (data)=>{
        console.log(data)
        io.emit('new.message', data)
    })
})


server.listen(3001,()=>{
    console.info('Server listening on port 3001')
}) 