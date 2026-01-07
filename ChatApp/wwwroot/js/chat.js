const connection = new signalR.HubConnectionBuilder()
  .withUrl("/chathub")
  .build();

connection.on("ReceiveMessage", function (user, message) {
  const msg = document.createElement("div");
  msg.textContent = `${user}: ${message}`;
  document.getElementById("messages").appendChild(msg);
});

connection.start().catch((err) => console.error(err.toString()));

var sendMessage = () => {
  const user = new URLSearchParams(window.location.search).get("user");
  const message = document.getElementById("message").value;
  connection.invoke("SendMessage", user, message);
};
