import { Button } from "@/components/ui/button";
import { WEBSOCKET_URI } from "@/lib/constants";
import { useCallback, useEffect, useState } from "react";

type ConnectionButtonProps = {
  webSocket: WebSocket | null;
  readyState: number | null;
  onConnectClicked: () => void;
  onDisconnectClicked: () => void;
};

const ConnectionButton = ({
  webSocket,
  readyState,
  onConnectClicked,
  onDisconnectClicked,
}: ConnectionButtonProps) => {
  console.log(readyState);

  if (webSocket !== null && readyState === WebSocket.CONNECTING) {
    return <Button disabled={true}>Connecting</Button>;
  }

  if (webSocket !== null) {
    return <Button onClick={onDisconnectClicked}>Disconnect</Button>;
  }

  return <Button onClick={onConnectClicked}>Connect</Button>;
};

export const Home = () => {
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
  const [readyState, setReadyState] = useState<number | null>(null);

  function onOpen() {
    console.info("Web socket connection open");

    setReadyState(WebSocket.OPEN);
  }

  function onMessage(messageEvent: MessageEvent) {
    console.info("Received message");
    console.log(messageEvent);
  }

  function onClose() {
    console.info("Received close event on web socket connection");

    webSocket?.close();

    setWebSocket(null);
    setReadyState(null);
  }

  function createWebSocketConnection() {
    console.info("Creating web socket connection...");

    const ws = new WebSocket(WEBSOCKET_URI);

    setWebSocket(ws);
    setReadyState(WebSocket.CONNECTING);

    ws.addEventListener("open", onOpen);
    ws.addEventListener("message", onMessage);
    ws.addEventListener("close", onClose);
  }

  const closeWebSocketConnection = useCallback(() => {
    console.info("Closing web socket connection...");

    if (webSocket !== null) {
      webSocket?.close();
    }
  }, [webSocket]);

  // function closeWebSocketConnection() {
  //   console.info("Closing web socket connection...");

  //   if (webSocket !== null) {
  //     webSocket?.close();
  //   }
  // }

  useEffect(() => {
    return () => {
      closeWebSocketConnection();
    };
  }, [closeWebSocketConnection]);

  return (
    <div className="p-8">
      <main>
        <h1 className="text-2xl">WebSocket testing</h1>
        <hr className="my-4" />
        <h2>Ready State: {readyState === null ? "null" : readyState}</h2>
        <ConnectionButton
          webSocket={webSocket}
          readyState={readyState}
          onConnectClicked={createWebSocketConnection}
          onDisconnectClicked={closeWebSocketConnection}
        />
      </main>
    </div>
  );
};
