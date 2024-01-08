export type SocketEvents = {
  oscOut: (dest: 'td' | 'max' | 'sc', route: string, data?: any) => void
  oscIn: (route: string, data?: any) => void
}
