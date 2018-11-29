const { MongoClient } = require('mongodb')

async function connect(connectionString) {
    try {
        const conn = await MongoClient.connect(connectionString, { useNewUrlParser: true })
        console.log('[MONGO - CONNECT] - Successfully connected to database server')
        return conn
    } catch (err) {
        console.log(`[MONGO - CONNECT] - Failed to connect to MongoDB: ${err}`)
        throw err
    }
}

function watch(db, coll, onChangeFunction) {
    const collection = db.collection(coll)
    const changeStream = collection.watch()

    changeStream.on('change', (change) => {
      onChangeFunction('creatureChange', change.fullDocument)
    })
}

module.exports = { connect, watch }
