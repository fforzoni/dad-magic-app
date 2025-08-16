const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const port = 3002;

app.use(cors());

console.log('=== TEST SERVER STARTING ===');
console.log('Port:', port);

app.get('/', (req, res) => {
  res.json({
    message: 'Test server is running!',
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);
  console.log(`Client address: ${socket.handshake.address}`);
  console.log(`Client headers:`, socket.handshake.headers);

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
  console.log(`Test server running on http://localhost:${port}`);
});
