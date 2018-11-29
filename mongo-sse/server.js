const path = require('path')
const express = require('express')
const mongo = require('./database')
const EventBroker = require('./EventBroker')

const app = express()
const broker = new EventBroker()
const connectionString = 'mongodb://localhost:30001'

const generateSendSseCallback = res => update => {
  console.log('Sending update', update)
  res.write(`data: ${JSON.stringify(update)}\n\n`)
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'))
})

app.get('/stream', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',

    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  })

  try {
      const sendSse = generateSendSseCallback(res)
      broker.emitter.on('creatureChange', sendSse)
      req.on('close', () => {
        broker.emitter.removeListener('creature', sendSse)
      })
    } catch (err) {
      res.status(500)
      console.log(`[SERVER] an error occured on /stream: ${err}`)
    }
})

mongo.connect(connectionString)
    .then((conn) => {
        console.log('[SERVER] - Received back a conn!')
        const db = conn.db('babblingBrook')
        broker.init(db, 'creatures')
        app.listen(3333) 
    })
    .catch((err) => {
        console.log(`[SERVER] - Error connecting to db: ${err}`)
    })

