export const chatSocket = (socket,io) => {
    socket.on('join-room', (data) => {
      socket.join(data.roomId)
      console.log('>>>>>>>>> check join room', data)
    })
  
    socket.on('message', (data) => {
      console.log('>>>>>>>>> check message', data)
      io.to(data.roomId).emit('message', data)
    })
}