const cors = require('cors')
// import axios from 'axios'
const axios = require('axios').default;
const express = require('express')

const app = express()


app.use(cors())
app.use(express.json())

const messages = []

app.post('/messages', (req,res)=>{
    const {body} = req
    messages.push(body)
    res.status(204).end()
})

app.get('/messages', (req,res)=>{
    res.json(messages)
})

//  -------------------------------

const subscribers = {}

app.post('/long',(req, res)=> {
    const { body } = req

    // SOME LOGIC TO ALL USERS
    Object.keys(subscribers).forEach((id) => {
        subscribers[id].json(body)
        delete subscribers[id]
    })
    res.status(204).end()
})

app.get('/long', (req, res) =>{
    const id =  Math.ceil(Math.random() * 100000)
    subscribers[id] = res
})

app.listen(3001,()=>{
    console.info('Server listening on port 3000')
})