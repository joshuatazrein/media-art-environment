import { useEffect, useState } from 'react'
import { SocketProvider } from './services/context'
import { useAppStore } from './services/store'
import { Socket, io } from 'socket.io-client'

function App() {
  const sample = useAppStore(state => ({}))
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
    <SocketProvider socket={socket}>
      <div></div>
    </SocketProvider>
  )
}

export default App
