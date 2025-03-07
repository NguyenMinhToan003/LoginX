export const CallVideo = (socket, io) => {
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    
    const room = io.sockets.adapter.rooms.get(roomId);
    const clients = room ? room.size : 0;
    io.to(roomId).emit('getRoomCountMember', clients);
  });

  socket.on('leave-room', (roomId) => {
    socket.leave(roomId);

    const room = io.sockets.adapter.rooms.get(roomId);
    const clients = room ? room.size : 0;

    io.to(roomId).emit('getRoomCountMember', clients);
  });

  socket.on('webrtc-signal', (data) => {
    
    socket.to(data.roomId).emit('webrtc-signal', data.sdp);

  });

  socket.on('call-video', (data) => {
  
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
    io.to(data.receiver.socketId).emit('accept-call', data);
  });
};