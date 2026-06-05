import { Server } from "socket.io";

let io: Server;

const activeUsers = new Map<string, string>();

export const initSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        "https://sprintflow-plum.vercel.app",
        "https://sprintflow-git-main-armaan-vishnoi-s-projects.vercel.app/",
      ],

      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("SOCKET CONNECTED:", socket.id);

    // DEBUG ONLY
    socket.onAny((event, data) => {
      console.log("EVENT RECEIVED:", event);

      console.log("DATA:", data);
    });

    // JOIN USER ROOM
    socket.on(
      "join-user",

      (userId) => {
        socket.join(`user:${userId}`);

        console.log("USER ROOM:", userId);
      },
    );

    // JOIN PROJECT

    socket.on(
      "join-project",

      (data) => {
        if (typeof data === "string") {
          data = JSON.parse(data);
        }

        const { projectId, userId } = data;

        const room = `project:${projectId}`;

        socket.join(room);

        activeUsers.set(socket.id, userId);

        io.to(room).emit(
          "active-users",

          Array.from(activeUsers.values()),
        );
      },
    );

    socket.on(
      "disconnect",

      () => {
        activeUsers.delete(socket.id);
      },
    );
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket not initialized");
  }

  return io;
};
