import { Server } from "socket.io"

import { CallVideo } from "./call.js"
import { StatusConnection } from "./statusConnection.js"
import { ChatSocket } from "./chat.js"

export const socketConnection = (server) => {
  const io = new Server(server, {
    cors: {
      origin: `${process.env.FRONTEND_ENDPOINT}`,
      methods: ['GET', 'POST']
    }
  })
  io.on('connection', (socket) => {
    
    StatusConnection(socket, io)
    ChatSocket(socket, io)
    CallVideo(socket, io)
    })
}