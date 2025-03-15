let serverRoomVideoCalls = {};

export const CallVideo = (socket, io) => {
  socket.on('join-room', ({ roomId, peerId, userId, name, picture }) => {
    socket.join(roomId);
    socket.to(roomId).emit('user-joined', { peerId });
    // Kiểm tra nếu phòng chưa tồn tại thì tạo mới
    if (!serverRoomVideoCalls[roomId]) {
      serverRoomVideoCalls[roomId] = {
        users: [{ peerId, userId, name, picture, socketId: socket.id }],
      };
    } else {
      // Kiểm tra xem user đã tồn tại trong phòng hay chưa
      const existingUser = serverRoomVideoCalls[roomId].users.find(user => user.userId === userId);
      if (!existingUser) {
        serverRoomVideoCalls[roomId].users.push(
          { peerId, userId, name, picture, socketId: socket.id });
      }
    }
    io.to(roomId).emit('getRoomVideoCall', serverRoomVideoCalls[roomId].users);
  });

  // Xử lý khi người dùng rời phòng
  socket.on('leave-room', (roomId) => {
    socket.leave(roomId);

    if (serverRoomVideoCalls[roomId]) {
      // Xóa người dùng khỏi danh sách phòng
      serverRoomVideoCalls[roomId].users = serverRoomVideoCalls[roomId].users.filter(user => user.socketId !== socket.id);

      // Nếu phòng trống, xóa luôn dữ liệu phòng
      if (serverRoomVideoCalls[roomId].users.length === 0) {
        delete serverRoomVideoCalls[roomId];
      }
    }
    // Cập nhật danh sách thành viên còn lại
    const room = io.sockets.adapter.rooms.get(roomId);
    const clients = room ? room.size : 0;
    io.to(roomId).emit('getRoomVideoCall', serverRoomVideoCalls[roomId]?.users || []);
  });

  // Xử lý khi người dùng bị mất kết nối
  socket.on('disconnect', () => {
    for (const roomId in serverRoomVideoCalls) {
      serverRoomVideoCalls[roomId].users = serverRoomVideoCalls[roomId].users.filter(user => user.socketId !== socket.id);
      if (serverRoomVideoCalls[roomId].users.length === 0) {
        delete serverRoomVideoCalls[roomId];
      } else {
        io.to(roomId).emit('getRoomVideoCall', serverRoomVideoCalls[roomId].users);
      }
    }
  });

  // Xử lý yêu cầu gọi video
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
