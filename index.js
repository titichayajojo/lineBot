var express = require("express");
var socket = require("socket.io");
//App setup
var app = express();
var server = app.listen(4000, function () {
  console.log("listening to requests on port 4000");
});

//static files
app.use(express.static("public"));

//Socket setup
var io = socket(server);

//socket recieve event from other clients
io.on("connection", function (socket) {
  console.log("made socket connection", socket.id);

  //socket expand event to other clients
  socket.on("chat", function (data) {
    console.log(data.message);
    io.sockets.emit("chat", data);
  });
});
