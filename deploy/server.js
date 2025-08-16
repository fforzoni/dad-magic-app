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

const port = process.env.PORT || 3001;

// Enable CORS
app.use(cors());

console.log('Deploy server starting...');
console.log('Port:', port);
console.log('Node version:', process.version);

// Basic HTTP endpoints
app.get('/', (req, res) => {
  res.json({
    message: 'Socket.IO server is running!',
    status: 'OK',
    timestamp: new Date().toISOString(),
    port: port
  });
});

app.get('/ping', (req, res) => {
  res.send('pong');
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Handle room joining
  socket.on('join-room', (data) => {
    const { roomId } = data;
    socket.join(roomId);
    socket.emit('room-joined', { roomId, clientId: socket.id });
    console.log(`Client ${socket.id} joined room: ${roomId}`);
  });

  // Handle movie selection
  socket.on('select-movie', (data) => {
    const { roomId, movie, clientId } = data;
    console.log(`Movie selected in room ${roomId}: ${movie.title}`);
    
    // Broadcast to all clients in the room (except sender)
    socket.to(roomId).emit('movie-selected', {
      roomId,
      movie,
      clientId,
      timestamp: Date.now()
    });
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

server.listen(port, () => {
  console.log(`Socket.IO server running on port ${port}`);
});
