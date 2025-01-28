const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["https://auction-bidding-system.onrender.com"],
    methods: ["GET", "POST" , "PUT", "DELETE"],
    credentials: true,
  },
});

const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {};
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId !== "undefined") userSocketMap[userId] = socket.id;

  console.log(userId);

  // io emit()
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // it is used to listen the event, can be used on both side
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);

    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

module.exports = { app, server, io, getReceiverSocketId };
