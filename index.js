const express = require("express");
const morgan = require("morgan");
const socket = require("socket.io");

const app = express();
const server = app.listen(3000, function () {
  console.log("Listening on Port: 3000");
});

//middleware
app.use(morgan("dev"));
app.use(express.static("public"));

//socket setup
const io = socket(server);
io.on("connection", function (socket) {
  console.log("made Socket Connection on:", socket.id);
  socket.on("chat", function (data) {
    io.sockets.emit("chat", data);
  });
  socket.on("typing", function (data) {
    socket.broadcast.emit("typing", data);
  });
});

//routes
