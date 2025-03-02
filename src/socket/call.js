export const CallVideo = (socket, io) => {
  socket.on('callVideo', (data) => {
    io.to(data.receiver.socketId).emit('inCommingCall', {
      isRinging: true,
      sender: {
        userId: data.sender.userId,
        name: data.sender.name,
        picture: data.sender.picture,
        socketId: socket.id
      },
      receiver: data.receiver
    })
  })
}