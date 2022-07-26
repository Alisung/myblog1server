const SocketIo = require("socket.io");

module.exports = (server) => {
  const io = SocketIo(server, {
    path: "/socket.io",
    cors: {
      origin: true,
      credentials: true,
    },
  });
  let socketArr = [];
  let socketArr2 = [];
  io.on("connection", (socket) => {
    //차단기능 구현 : 먼저 react에서 userid를 emit으로 server로 보낸 후 소켓 배열에 담아 다시
    // react로 전송해 접속한 유저목록을 보내고 브라우저에 띄우는 방식을 사용한다.
    // 그 유저를 클릭하면 그 유저에 관련한 채팅(조건넣기), 데이터 등을 보이지 않게 만든다;
    console.log(`user connected : ${socket.id}`);

    socket.on("join_room", (data, roomId) => {
      socket.join(roomId);
      socketArr = { id: data, socketid: socket.id };
      socketArr2.push(socketArr);
      socket.broadcast.to(roomId).emit("join_msg", {
        message: `${data}님이 입장하였습니다`,
      });
      // console.log(`user with id ${data} joined room : ${roomId}`);
      // console.log("유저 목록 : ", socketArr2);
      socket.on("sendText", (textdata) => {
        console.log(textdata);
        socket.broadcast.to(roomId).emit("userTextEmit", {
          username2: textdata.username,
          text2: textdata.text,
        });
      });
      socket.on("send_socketId", (index) => {
        // console.log("안되나? ", index.id);

        for (let i = 0; i < socketArr2.length; i++) {
          if (index.id == socketArr2[i].id) {
            console.log(
              "소켓아이디 :",
              index.id,
              "사용자 아이디 :",
              index.userid,
              "소켓 아이디2 : ",
              socketArr2[i].socketid
            );
            socket.broadcast.to(socketArr2[i].socketid).emit("muteMsg", {
              socketid: index.userid,
              socketText: index.text,
            });
          }
        }
      });
      socket.on("leaveroom", () => {
        socket.broadcast.to(roomId).emit("leave_msg", {
          message: `${data}님이 퇴장하였습니다`,
        });
        console.log(`User Disconnected ${socket.id}`);
        socket.leave(roomId);

        console.log("유저 목록 : ", socketArr);
      });
    });

    socket.on("disconnect", () => {
      console.log(`User Disconnected ${socket.id}`);
    });
  });
};
