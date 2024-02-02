import { RouterProvider } from "react-router-dom";
import { router } from "./router";
// import { useWebSocket } from "@/components/web-socket-provider";
// import { useEffect } from "react";

export const App = () => {
  // const { ready, send, messages, errors } = useWebSocket();

  // useEffect(() => {
  //   if (ready) {
  //     console.log(send);
  //     send?.("Test");
  //   }
  // }, [ready, send]);

  // console.log(messages);
  // console.log(errors);

  return <RouterProvider router={router} />;
};
