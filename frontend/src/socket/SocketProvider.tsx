import { useEffect } from "react";

import { socket } from "./socket";

export default function SocketProvider({ children }: any) {
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();

      console.log("FRONTEND SOCKET CONNECT");
    }

    return () => {
      socket.off();
    };
  }, []);

  return children;
}
