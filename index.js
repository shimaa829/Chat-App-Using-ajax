const cors = require('cors')
const axios = require('axios').default;
const express = require('express')


const app = express()


app.use(cors())
app.use(express.json())

const subscribers = []


app.get('/messages', (req,res)=>{
    subscribers.push(res)
    res.writeHead(200 , {
        'Content-Type': 'text/event-stream',
    })
})

app.post('/messages', (req,res)=>{
    const {body} = req
    subscribers.forEach((s) => s.write(`data: ${JSON.stringify(body)}\n\n`))
    res.status(204).end()
})



app.listen(3001,()=>{
    console.info('Server listening on port 3000')
})