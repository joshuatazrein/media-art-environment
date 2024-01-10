"use strict";
import express from "express";
import ViteExpress from "vite-express";
import { Server as SocketServer } from "socket.io";
import { Client as OscClient, Server as OscServer } from "node-osc";
const app = express();
const server = ViteExpress.listen(
  app,
  3e3,
  () => console.log("Server is listening...")
);
const io = new SocketServer(server);
const maxOut = new OscClient("127.0.0.1", 7001);
const tdOut = new OscClient("127.0.0.1", 7002);
const scOut = new OscClient("127.0.0.1", 7003);
const oscIn = new OscServer(7004, "0.0.0.0");
oscIn.on("message", async ([message, ...data]) => {
  switch (message) {
  }
});
io.on("connection", (socket) => {
  console.log(socket.id, "connected");
  socket.on("oscOut", (target, route, data) => {
    const PORTS = {
      max: maxOut,
      td: tdOut,
      sc: scOut
    };
    console.log("sending OSC:", target, route, data);
    PORTS[target].send(route, data);
  });
  oscIn.on("message", (data) => {
    console.log("received OSC", data);
    socket.emit(data[0], data.slice(1));
  });
});
