const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origins: ["http://localhost:4200"],
  },
});
const port = 3000;
app.get("/", (req, res) => {
  res.send("<h1>Hi! I am the server (Socket.io)</h1>");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("message", (msg) => {
    console.log("Message-> " + msg);
    setTimeout(() => {
        io.emit('message', 'message received from server!');
    }, 1000);
  });
});

http.listen(port, () => {
  console.log("Listening on -------------> http://localhost:" + port);
});
