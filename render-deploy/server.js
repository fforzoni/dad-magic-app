const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Simple CORS setup for live sites
app.use(cors({
  origin: [
    "https://golden-fenglisu-91831d.netlify.app",
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:3003"
  ],
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

const io = socketIo(server, {
  cors: {
    origin: [
      "https://golden-fenglisu-91831d.netlify.app",
      "http://localhost:3000",
      "http://localhost:3001", 
      "http://localhost:3002",
      "http://localhost:3003"
    ],
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ['websocket', 'polling']
});

const port = process.env.PORT || 3001;

console.log('=== RENDER SOCKET SERVER STARTING ===');
console.log('Port:', port);
console.log('Node version:', process.version);
console.log('Environment:', process.env.NODE_ENV || 'development');

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Dad Magic Socket Server is running!',
    status: 'OK',
    timestamp: new Date().toISOString(),
    port: port,
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);
  console.log(`Client origin: ${socket.handshake.headers.origin}`);

  // Handle room joining
  socket.on('join-room', (data) => {
    try {
      const { roomId } = data;
      socket.join(roomId);
      socket.emit('room-joined', { roomId, clientId: socket.id });
      console.log(`Client ${socket.id} joined room: ${roomId}`);
    } catch (error) {
      console.error('Error joining room:', error);
    }
  });

  // Handle movie selection
  socket.on('select-movie', (data) => {
    try {
      const { roomId, movie, clientId } = data;
      console.log(`Movie selected in room ${roomId}: ${movie.title}`);
      console.log(`Movie data:`, { title: movie.title, year: movie.release_date, rating: movie.vote_average });

      // Broadcast to all clients in the room (except sender)
      socket.to(roomId).emit('movie-selected', {
        roomId,
        movie,
        clientId,
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('Error handling movie selection:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });

  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });
});

// Start server
server.listen(port, () => {
  console.log('==========================================');
  console.log('Socket.IO server started successfully!');
  console.log(`Server running on port: ${port}`);
  console.log(`Started at: ${new Date().toISOString()}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('==========================================');
});

// Error handling
server.on('error', (err) => {
  console.error('Server error:', err);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
