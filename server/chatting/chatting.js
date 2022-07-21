const SocketIo = require("socket.io");

module.exports = (server) => {
  const io = SocketIo(server, {
    path: "/socket.io",
    cors: {
      origin: true,
      credentials: true,
    },
  });
  io.on("connection", (socket) => {
    console.log(`user connected : ${socket.id}`);

    socket.on("join_room", (data, roomId) => {
      socket.join(roomId);
      socket.broadcast.to(roomId).emit("join_msg", {
        message: `${data}님이 입장하였습니다`,
      });
      console.log(`user with id ${data} joined room : ${roomId}`);
      let a = socket.to(roomId).adapter;
      // console.log("유저 목록 : ", a);
      socket.on("sendText", (textdata) => {
        console.log(textdata);
        socket.broadcast.to(roomId).emit("userTextEmit", {
          username2: textdata.username,
          text2: textdata.text,
        });
      });
      socket.on("leaveroom", () => {
        socket.broadcast.to(roomId).emit("leave_msg", {
          message: `${data}님이 퇴장하였습니다`,
        });
        console.log(`User Disconnected ${socket.id}`);
        socket.leave(roomId);
        // console.log("유저 목록 : ", a);
      });
    });

    // socket.on("sendText", (textData) => {
    //     console.log(textData);
    //     socket.broadcast.emit("userTextEmit", {
    //         username2 : textData.username,
    //         text2 : textData.text
    //     })
    socket.on("disconnect", () => {
      console.log(`User Disconnected ${socket.id}`);
    });
  });
};
