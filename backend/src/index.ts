import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    io.emit("disconnect", {
      message: "Client disconneted",
      data: { id: socket.id },
    });
  });
});

server.listen(process.env.PORT, () => {
  console.log("Server is running!");
});
