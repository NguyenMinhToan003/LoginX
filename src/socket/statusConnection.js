let listUsers = []
export const StatusConnection = (socket, io) => {
  
  socket.on('disconnect', () => {
    console.log('disconnect', listUsers)

    const index = listUsers.findIndex(user => user.socketId === socket.id)

    if (index !== -1) {
      const userChose = listUsers[index]
      listUsers = listUsers.filter(user => user.userId !== userChose.userId)
    }
    console.log('disconnect', listUsers)
  })
  socket.emit('getListUsers', listUsers)
  socket.on('addNewUser', (data) => {

    console.log(listUsers.indexOf(data) === -1)
    if (listUsers.indexOf(data) === -1) {
      listUsers.push({
      userId: data.userId,
      socketId: socket.id,
      name: data.name,
      picture: data.picture
      })
    }
  console.log('addNewUser', listUsers)
   
    io.emit('getListUsers', listUsers)
  })

}