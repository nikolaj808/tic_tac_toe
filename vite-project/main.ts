import "./style.css";
import { initializeWebSocket } from "./src/web-socket";

const createGameButtonElement = document.getElementById("create-game-button")!;

createGameButtonElement.addEventListener("click", () => {
  const roomName = prompt("What do you want the name of your lobby to be?");

  console.log(roomName === null ? "null" : roomName);

  window.location.href = "/room/?name=test";
});

initializeWebSocket();
