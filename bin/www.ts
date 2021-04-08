#!/usr/bin/env node

import app from '../src/app'
import Debug from 'debug'

const debug = Debug('aseit:server')
import http from 'http'

var port = normalizePort(process.env.PORT || '3000')

var server = http.createServer(app.callback())

server.listen(port)
console.log(`Server is listening http://localhost:${port}`)
server.on('error', onError)
server.on('listening', onListening)

function normalizePort(val: any) {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    return val
  }

  if (port >= 0) {
    return port
  }

  return false
}

function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

function onListening() {
  var addr = server.address()
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port
  debug('Listening on ' + bind)
}