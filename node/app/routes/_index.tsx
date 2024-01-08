import { useEffect } from 'react'
import { useSocket } from '~/context'

export default function Index() {
  const socket = useSocket()

  useEffect(() => {
    if (!socket) return

    socket.emit('oscOut', 'max', '/hello', 'from Node')
    socket.emit('oscOut', 'td', '/hello', 'from Node')
    socket.emit('oscOut', 'sc', '/hello', 'from Node')
  })
  return <div></div>
}
