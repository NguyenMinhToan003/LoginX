import { Server } from "socket.io"
import { chatSocket } from "./chat.js"

export const socketConnection = (server) => {
  const io = new Server(server, {
    cors: {
      origin: `${process.env.FRONTEND_ENDPOINT}`,
      methods: ['GET', 'POST']
    }
  })
  const listUsers = []
  io.on('connection', (socket) => {
    listUsers.push(socket.id)
    console.log('>>>>>>>>> check listUsers', listUsers)
    chatSocket(socket, io)
    socket.on('disconnect', () => {
      const index = listUsers.indexOf(socket.id)
      listUsers.splice(index, 1)
      console.log('>>>>>>>>> check listUsers', listUsers)
    })})
}