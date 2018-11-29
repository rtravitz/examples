const { EventEmitter } = require('events')
const mongo = require('./database')

class EventBroker {
  constructor() {
    this.emitter = new EventEmitter()
    this.emitWrapper = this.emitWrapper.bind(this)
  }

  emitWrapper(event, ...args) { this.emitter.emit(event, ...args) }

  init(db, collection) {
    mongo.watch(db, collection, this.emitWrapper)
    console.log('[EVENT BROKER] - Started Mongo change stream and connected to EventEmitter')
  }
}

module.exports = EventBroker
