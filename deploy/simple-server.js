const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

// Railway deployment - simplified server for better compatibility
const app = express();
const server = http.createServer(app);

// Simple CORS setup
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const port = process.env.PORT || 3001;

console.log('=== SIMPLE SERVER STARTING ===');
console.log('Port:', port);

app.get('/', (req, res) => {
  res.json({
    message: 'Simple Socket.IO server is running!',
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on('join-room', (data) => {
    const { roomId } = data;
    socket.join(roomId);
    socket.emit('room-joined', { roomId, clientId: socket.id });
    console.log(`Client ${socket.id} joined room: ${roomId}`);
  });

  socket.on('select-movie', (data) => {
    const { roomId, movie, clientId } = data;
    console.log(`Movie selected: ${movie.title}`);
    socket.to(roomId).emit('movie-selected', data);
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

server.listen(port, () => {
  console.log(`Simple server running on port ${port}`);
});
