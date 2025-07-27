import http from "http";
import app from "./app";
import connectDB from "./config/db";
import { Server as SocketIOServer } from "socket.io";
/// <reference path="./types/express/global.d.ts" />


const server = http.createServer(app);

export const initSocketServer = (server?: http.Server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  // global.io = io;

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("joinRoom", (roomId: string) => {
      socket.join(roomId);
      console.log(`User joined room: ${roomId}`);
    });

    socket.on("sendMessage", (data) => {
      const { chatRoomId, message } = data;
      io.to(chatRoomId).emit("newMessage", message);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });

  return io;
};

// Connect to DB and start server
connectDB().then(() => {
  initSocketServer(server);

  // Start Express server
  server.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
  });
});
