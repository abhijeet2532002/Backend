// server.js or index.js
import express from 'express';
import dotenv from 'dotenv';
import apiGateWay from './router/ApiGateway.js';
import DBConfig from './config/DBConfig.js';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();
const port = process.env.port || 9192;

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // or set your React origin
    methods: ["GET", "POST"]
  }
});

// Store io instance globally or pass to routes
app.set("io", io);

app.use(cors());
app.use(express.json());
app.use('/', apiGateWay);

// Socket.io connection
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server Started on ${port}`);
});
