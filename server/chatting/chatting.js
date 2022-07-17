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
    socket.on("join_room", (data) => {
      socket.join(data);
      console.log(`user with id ${socket.id} joined room : ${data}`);
    });
    socket.on("sendText", (textdata) => {
      console.log(textdata);
      socket.broadcast.emit("userTextEmit", {
        username2: textdata.username,
        text2: textdata.text,
      });
    });
    socket.on("disconnect", () => {
      console.log(`User Disconnected ${socket.id}`);
    });
    // socket.on("sendText", (textData) => {
    //     console.log(textData);
    //     socket.broadcast.emit("userTextEmit", {
    //         username2 : textData.username,
    //         text2 : textData.text
    //     })
    // socket.on("disconnect", () => {
    //   console.log(`User Disconnected ${socket.id}`);
    // });
  });
};
