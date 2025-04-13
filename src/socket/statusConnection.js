let listUsers = []

export const StatusConnection = (socket, io) => {

  socket.on('join-list-rooms', (rooms) => {
    rooms.forEach((room) => {
      socket.join(room)
    })
  })


  socket.on('disconnect', () => {
    const index = listUsers.findIndex((user) => user.socketId === socket.id)
    if (index !== -1) {
      listUsers.splice(index, 1) 
    }
    io.emit('getListUsers', listUsers)
  })
  socket.emit('getListUsers', listUsers)

  socket.on('addNewUser', (data) => {
    if (listUsers.findIndex((user) => user.userId === data._id) === -1) {
      listUsers.push({
        userId: data._id,
        socketId: socket.id,
        name: data.name,
        picture: data.picture,
      })
    }
    io.emit('getListUsers', listUsers)
  })
}
