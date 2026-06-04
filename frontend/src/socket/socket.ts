import { io } from "socket.io-client";

export const socket = io(
  "http://localhost:5000",

  {
    autoConnect: false,

    reconnection: true,

    reconnectionAttempts: 10,

    reconnectionDelay: 1000,
  },
);
