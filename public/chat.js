//Make connection to the server
var socket = io.connect("http://localhost:4000");

//Query DOM
var message = document.getElementById("message"),
  handle = document.getElementById("handle"),
  btn = document.getElementById("send"),
  output = document.getElementById("output");

//Emit Event
btn.addEventListener("click", function () {
  socket.emit("chat", {
    message: message.value,
    handle: handle.value,
  });
});

//Listen for events and push to the html
socket.on("chat", function (data) {
  console.log(data.handle);
  output.innerHTML +=
    "<p><strong>" + data.handle + "</strong>" + data.message + "</p>";
});
