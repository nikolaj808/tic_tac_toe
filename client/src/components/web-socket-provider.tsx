import { WEBSOCKET_URI } from "@/lib/constants";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const webSocket = new WebSocket(WEBSOCKET_URI);

type WebSocketProviderProps = {
  children: React.ReactNode;
};

type WebSocketProviderState = {
  ready: boolean;
  messages: string[];
  errors: Event[];
  send?: (data: string) => void;
};

const initialState: WebSocketProviderState = {
  ready: false,
  messages: [],
  errors: [],
};

const WebSocketProviderContext =
  createContext<WebSocketProviderState>(initialState);

export function WebSocketProvider({
  children,
  ...props
}: WebSocketProviderProps) {
  console.log("WebSocketProvider render called");

  const webSocketRef = useRef(webSocket);

  const [ready, setReady] = useState(initialState.ready);
  const [messages, setMessages] = useState(initialState.messages);
  const [errors, setErrors] = useState(initialState.errors);

  useEffect(() => {
    console.log("WebSocketProvider useEffect called");
    const onOpen = () => setReady(true);
    const onClose = () => setReady(false);
    const onError = (event: Event) => setErrors((prev) => [...prev, event]);
    const onMessage = (message: MessageEvent<unknown>) =>
      setMessages((prev) => [...prev, message.data as string]);

    const ws = webSocketRef.current;

    ws.addEventListener("open", onOpen);
    ws.addEventListener("close", () => setReady(false));
    ws.addEventListener("error", (event) =>
      setErrors((prev) => [...prev, event])
    );
    ws.addEventListener("message", (messageEvent) =>
      setMessages((prev) => [...prev, messageEvent.data])
    );

    return () => {
      setReady(false);

      ws.removeEventListener("open", onOpen);
      ws.removeEventListener("close", onClose);
      ws.removeEventListener("error", onError);
      ws.removeEventListener("message", onMessage);

      if (ws.readyState === ws.OPEN) {
        ws.close(1000);
        webSocketRef.current = new WebSocket(WEBSOCKET_URI);
      }
    };
  }, []);

  const value = {
    ready,
    messages,
    errors,
    send: webSocketRef.current.send,
  };

  return (
    <WebSocketProviderContext.Provider {...props} value={value}>
      {children}
    </WebSocketProviderContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useWebSocket = () => {
  const context = useContext(WebSocketProviderContext);

  if (context === undefined)
    throw new Error("useWebSocket must be used within a WebSocketProvider");

  return context;
};
