import { Server } from "socket.io"
import { chatSocket } from "./chat.js"
import { statusConnection } from "./statusConnection.js"

export const socketConnection = (server) => {
  const io = new Server(server, {
    cors: {
      origin: `${process.env.FRONTEND_ENDPOINT}`,
      methods: ['GET', 'POST']
    }
  })
  io.on('connection', (socket) => {
    
    chatSocket(socket, io)
    statusConnection(socket, io)
    })
}