import fs from 'fs'
import { createServer } from 'http'
import path from 'path'
import { createRequestHandler } from '@remix-run/express'
import compression from 'compression'
import express from 'express'
import morgan from 'morgan'
import { Server as SocketServer } from 'socket.io'
import { Client, Server } from 'node-osc'
import { SocketEvents } from 'types'

const MODE = process.env.NODE_ENV
const BUILD_DIR = path.join(process.cwd(), 'server/build')

if (!fs.existsSync(BUILD_DIR)) {
  console.warn(
    "Build directory doesn't exist, please run `npm run dev` or `npm run build` before starting the server."
  )
}

const app = express()

// You need to create the HTTP server from the Express app
const httpServer = createServer(app)

// And then attach the socket.io server to the HTTP server
const io = new SocketServer<SocketEvents>(httpServer)

const maxOut = new Client('127.0.0.1', 7001)
const tdOut = new Client('127.0.0.1', 7002)
const scOut = new Client('127.0.0.1', 7003)
const oscIn = new Server(7004, '0.0.0.0')

// Then you can use `io` to listen the `connection` event and get a socket
// from a client
io.on('connection', socket => {
  // from this point you are on the WS connection with a specific client
  console.log(socket.id, 'connected')

  socket.on('oscOut', (source, route, data) => {
    const PORTS = {
      max: maxOut,
      td: tdOut,
      sc: scOut
    }
    console.log('sending OSC:', source, route, data)
    PORTS[source].send(route, data)
  })

  oscIn.on('message', data => {
    socket.emit('oscIn', data[0], data.slice(1))
  })
})

app.use(compression())

// You may want to be more aggressive with this caching
app.use(express.static('public', { maxAge: '1h' }))

// Remix fingerprints its assets so we can cache forever
app.use(express.static('public/build', { immutable: true, maxAge: '1y' }))

app.use(morgan('tiny'))
app.all(
  '*',
  MODE === 'production'
    ? createRequestHandler({ build: require('./build') })
    : (req, res, next) => {
        purgeRequireCache()
        const build = require('./build')
        return createRequestHandler({ build, mode: MODE })(req, res, next)
      }
)

const port = process.env.PORT || 3000

// instead of running listen on the Express app, do it on the HTTP server
httpServer.listen(port, () => {
  console.log(`Express server listening on port ${port}`)
})

////////////////////////////////////////////////////////////////////////////////
function purgeRequireCache() {
  // purge require cache on requests for "server side HMR" this won't let
  // you have in-memory objects between requests in development,
  // alternatively you can set up nodemon/pm2-dev to restart the server on
  // file changes, we prefer the DX of this though, so we've included it
  // for you by default
  for (const key in require.cache) {
    if (key.startsWith(BUILD_DIR)) {
      delete require.cache[key]
    }
  }
}
