const mongo = require('./database')

const connectionString = 'mongodb://localhost:30001'
mongo.connect(connectionString)
    .then((conn) => {
        console.log('[INDEX] - Received back a conn!')
        const db = conn.db('babblingBrook')
        mongo.watch(db, 'creatures', (change) => {
            console.log(`[INDEX] - Saw a change: ${JSON.stringify(change)}`)
        })
    })
    .catch((err) => {
        console.log(`[INDEX] - Error connecting to db: ${err}`)
    })
