export const CallVideo = (socket, io) => {
  socket.on('callVideo', (data) => {
    io.to(data.receiver.socketId).emit('inCommingCall', data)
  })
}