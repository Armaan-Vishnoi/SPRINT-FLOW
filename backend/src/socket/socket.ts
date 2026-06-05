import { Server } from "socket.io";

let io: Server;

const activeUsers = new Map<string, string>();

export const initSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        "https://sprintflow-plum.vercel.app",
        "https://sprintflow-git-main-armaan-vishnoi-s-projects.vercel.app",
      ],

      methods: ["GET", "POST"],

      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("SOCKET CONNECTED:", socket.id);

    // DEBUG
    socket.onAny((event, data) => {
      console.log("EVENT RECEIVED:", event);

      console.log("DATA:", data);
    });

    // ======================
    // USER ROOM
    // ======================

    socket.on("join-user", (userId) => {
      socket.join(`user:${userId}`);

      activeUsers.set(socket.id, userId);

      console.log("USER JOINED ROOM:", `user:${userId}`);
    });

    // ======================
    // PROJECT ROOM
    // ======================

    socket.on("join-project", (data) => {
      if (typeof data === "string") {
        data = JSON.parse(data);
      }

      const { projectId } = data;

      const room = `project:${projectId}`;

      socket.join(room);

      console.log("PROJECT ROOM:", room);

      io.to(room).emit(
        "active-users",

        Array.from(activeUsers.values()),
      );
    });

    socket.on("disconnect", () => {
      console.log("SOCKET DISCONNECTED:", socket.id);

      activeUsers.delete(socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket not initialized");
  }

  return io;
};
