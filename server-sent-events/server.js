const path = require('path')
const express = require('express')
const app = express()

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

  setTimeout(() => {
    res.write('data: Sending 1\n\n')
  }, 1000)

  setTimeout(() => {
    res.write('data: Sending 2\n\n')
  }, 2000)

  setTimeout(() => {
    res.write('data: Sending 3\n\n')
  }, 3000)
})

app.listen(3333) 
