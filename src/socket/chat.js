export const ChatSocket = (socket,io) => {
  socket.on('join-room', (data) => {
      socket.join(data.roomId)
    })
  
    socket.on('message', (data) => {
      io.to(data.roomId).emit('message', data)
    })
  socket.on('leave-room', (data) => {
    socket.leave(data.roomId)
  })
}