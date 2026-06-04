import http from "http";

import app from "./app";

import { Server } from "socket.io";

import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://your-vercel-url.vercel.app"],

    methods: ["GET", "POST"],

    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("SOCKET CONNECTED:", socket.id);

  socket.on("join-project", (data) => {
    socket.join(data.projectId);
  });

  socket.on("disconnect", () => {
    console.log("SOCKET DISCONNECTED");
  });
});

server.listen(PORT, () => {
  console.log(`Server running ${PORT}`);
});
