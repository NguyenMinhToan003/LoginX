export const chatSocket = (socket,io) => {
    socket.on('join-room', (data) => {
      socket.join(data.roomId)
    })
  
    socket.on('message', (data) => {
      io.to(data.roomId).emit('message', data)
    })
}