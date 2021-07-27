var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/", function (req, res) {
  res.sendfile("index.html");
});

//server->client
//socket.io event
// io.on("connection", function (socket) {
//   console.log("A user connected");

//   //emit server->client
//   setTimeout(function () {
//     socket.emit("testerEvent", {
//       description: "A custom event name testerEvent",
//     });
//   }, 4000);

//   socket.on("disconnect", function () {
//     console.log("A user disconnected");
//   });
// });

//client -> server
// io.on("connection", function (socket) {
//   socket.on("cilentEvent", function (data) {
//     console.log(data);
//   });
// });

//broadcasting
// var clients = 0;

// io.on("connection", function (socket) {
//   clients++;
//   io.sockets.emit("broadcast", {
//     description: clients + "clients connected",
//   });

//   socket.on("disconnect", function () {
//     clients--;
//     io.sockets.emit("broadcast", {
//       description: clients + "clients connected",
//     });
//   });
// });

//welcome when user connect
// var clients = 0;

// io.on("connection", function (socket) {
//   clients++;
//   io.sockets.emit("newclitentconnect", {
//     description: "Hey, welcome",
//   });

//   socket.broadcast.emit("newclitentconnect", {
//     description: clients + "clients connected",
//   });

//   socket.on("disconnect", function () {
//     clients--;
//     socket.broadcast.emit("newclitentconnect", {
//       description: clients + "clients connected",
//     });
//   });
// });

http.listen(3000, function () {
  console.log("Listening on http://localhost:3000");
});
