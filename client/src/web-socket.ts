import { getListRoomsEvent } from "./web-socket-requests";
import { handleMessage, parseMessage } from "./web-socket-responses";

const WEB_SOCKET_CONNECTION_ATTEMPTS = 5;

function onOpen() {
  console.info("Web socket connection open");

  readyState = WebSocket.OPEN;

  webSocket.send(JSON.stringify(getListRoomsEvent()));
}

function onMessage(messageEvent: MessageEvent) {
  console.info("Received message");

  const message = parseMessage(messageEvent);

  handleMessage(message);
}

function onClose() {
  console.info("Received close event on web socket connection");

  if (readyState === WebSocket.OPEN) {
    readyState = WebSocket.CLOSED;
    webSocket.close();
  } else {
    reconnectToWebSocket();
  }
}

function reconnectToWebSocket() {
  if (reconnectAttempts < WEB_SOCKET_CONNECTION_ATTEMPTS) {
    setTimeout(() => {
      console.info("Attempting to reconnect to web socket...");

      reconnectAttempts += 1;
      readyState = WebSocket.CONNECTING;
      webSocket = new WebSocket("ws://localhost:8080/ws");

      webSocket.addEventListener("open", onOpen);
      webSocket.addEventListener("message", onMessage);
      webSocket.addEventListener("close", onClose);
    }, reconnectAttempts * 1000);
  }
}

let webSocket: WebSocket;
let readyState: number;
let reconnectAttempts: number;

export function initializeWebSocket() {
  console.info("Creating web socket connection...");

  webSocket = new WebSocket("ws://localhost:8080/ws");
  readyState = WebSocket.CONNECTING;
  reconnectAttempts = 0;

  webSocket.addEventListener("open", onOpen);
  webSocket.addEventListener("message", onMessage);
  webSocket.addEventListener("close", onClose);
}
