const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origins: ["http://localhost:4200"],
  },
});
const SerialPort = require('serialport');
const ReadLine = SerialPort.parsers.Readline;
var COM = "COM4";
var serialPort = new SerialPort(COM, { baudRate: 9600 });
const parser = serialPort.pipe(new ReadLine({ delimiter: "\r\n" }));
const port = 3000;

// --->  SERIAL COMMUNICATION FUNCTIONS

//SERIAL OPEN
parser.on("open", function () {
  console.log("connection is opened");
});
serialPort.on("open", function () {
  console.log("Serial Port " + COM + " is opened.");
});
//SERIAL ERROR
parser.on("error", (err) => console.log(err));
serialPort.on("error", (err) => console.log(err));
//SERIAL DATA RECEPTION
parser.on("data", function (data) {
  console.log(data.toString());
});

// --->  SOCKET IO FUNCTIONS

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
