export const CallVideo = (socket, io) => {
  socket.on('join-room', ({ roomId, peerId }) => {
    socket.join(roomId);
    socket.to(roomId).emit('user-joined', { peerId });

    // Cập nhật số lượng thành viên
    const room = io.sockets.adapter.rooms.get(roomId);
    const clients = room ? room.size : 0;
    io.to(roomId).emit('getRoomCountMember', clients);
  });

  // Xử lý khi người dùng rời phòng
  socket.on('leave-room', (roomId) => {
    socket.leave(roomId);
    console.log(`User ${socket.id} left room ${roomId}`);

    const room = io.sockets.adapter.rooms.get(roomId);
    const clients = room ? room.size : 0;
    io.to(roomId).emit('getRoomCountMember', clients);
  });

  // Xử lý yêu cầu gọi video
  socket.on('call-video', (data) => {
    console.log('Call video request:', data);
    io.to(data.receiver.socketId).emit('iscomming-call', {
      isRinging: true,
      sender: {
        userId: data.sender.userId,
        name: data.sender.name,
        picture: data.sender.picture,
        socketId: socket.id,
      },
      receiver: data.receiver,
      roomId: data.roomId,
    });
  });

  socket.on('hangup-call', (data) => {
    io.to(data.receiver.socketId).emit('hangup-call', {
      isRinging: false,
      sender: data.sender,
      receiver: data.receiver,
    });
  });

  socket.on('accept-call', (data) => {
    console.log('Accept call:', data);
    io.to(data.receiver.socketId).emit('accept-call', data);
  });

  
};