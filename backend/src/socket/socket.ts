import { Server } from "socket.io";

let io: Server;

const activeUsers = new Map<string, string>();

export const initSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("SOCKET CONNECTED:", socket.id);

    // TEST EVERY EVENT

    socket.onAny((event, data) => {
      console.log("EVENT RECEIVED:", event);

      console.log("DATA:", data);

      socket.on(
        "join-user",

        (userId) => {
          socket.join(`user:${userId}`);

          console.log("USER ROOM:", userId);
        },
      );
    });

    // JOIN PROJECT

    socket.on(
      "join-project",

      (data) => {
        console.log("JOIN PROJECT CALLED");

        // Postman sends string sometimes
        if (typeof data === "string") {
          data = JSON.parse(data);
        }

        const { projectId, userId } = data;

        const room = `project:${projectId}`;

        socket.join(room);

        console.log("JOINED ROOM:", room);

        activeUsers.set(socket.id, userId);

        io.to(room).emit(
          "active-users",

          Array.from(activeUsers.values()),
        );
      },
    );
    // DISCONNECT

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
