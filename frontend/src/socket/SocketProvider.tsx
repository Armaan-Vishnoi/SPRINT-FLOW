import { useEffect } from "react";

import { socket } from "./socket";

import { useAuth } from "../context/AuthContext";

export default function SocketProvider({ children }: any) {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    if (!socket.connected) {
      socket.connect();

      console.log("FRONTEND SOCKET CONNECT");
    }

    socket.emit(
      "join-user",

      user._id || user.id,
    );

    return () => {
      socket.disconnect();
    };
  }, [user]);

  return children;
}
