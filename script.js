document
  .getElementById("course-registration")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Вы записаны на курс: " + document.getElementById("course").value);
  });

document.getElementById("send-button").addEventListener("click", function () {
  const messageInput = document.getElementById("message-input");
  const chatBox = document.getElementById("chat-box");
  const newMessage = document.createElement("div");
  newMessage.className = "message";
  newMessage.textContent = messageInput.value;
  chatBox.appendChild(newMessage);
  messageInput.value = "";
});
