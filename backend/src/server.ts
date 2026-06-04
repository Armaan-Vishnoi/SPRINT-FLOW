import dotenv from "dotenv";

dotenv.config();

import http from "http";

import app from "./app";

import { connectDB } from "./config/db";

import { initSocket } from "./socket/socket";

const PORT = process.env.PORT || 5000;

// CONNECT DATABASE FIRST

connectDB();

const server = http.createServer(app);

// SOCKET

initSocket(server);

server.listen(
  PORT,

  () => {
    console.log(`Server running ${PORT}`);
  },
);
