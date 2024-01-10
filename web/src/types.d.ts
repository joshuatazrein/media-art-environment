type Target = 'sc' | 'td' | 'node' | 'max'

type SocketEvents = {
  oscOut: (target: Target, route: string, data: any) => void
} & Record<stirng, (...data: any) => void>
