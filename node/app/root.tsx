import type { MetaFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from '@remix-run/react'
import { useEffect, useState } from 'react'
import type { Socket } from 'socket.io-client'
import io from 'socket.io-client'
import { SocketEvents } from 'types'

import { SocketProvider } from '~/context'

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1'
})

export default function App() {
  const [socket, setSocket] = useState<Socket<SocketEvents>>()

  useEffect(() => {
    const socket = io()
    setSocket(socket)
    return () => {
      socket.close()
    }
  }, [])

  useEffect(() => {
    if (!socket) return
    const cb: SocketEvents['oscIn'] = (route, data) => {
      console.log('IN:', route, data)
    }
    socket.on('oscIn', cb)
    return () => {
      socket.off('oscIn', cb)
    }
  }, [socket])

  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <SocketProvider socket={socket}>
          <Outlet />
        </SocketProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
