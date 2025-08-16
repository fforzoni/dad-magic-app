const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ["https://golden-fenglisu-91831d.netlify.app", "http://localhost:3000", "http://localhost:3001", "http://localhost:3002"],
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
  },
  transports: ['websocket', 'polling']
});

const port = process.env.PORT || 3001;

// Enable CORS
app.use(cors({
  origin: ["https://golden-fenglisu-91831d.netlify.app", "http://localhost:3000", "http://localhost:3001", "http://localhost:3002"],
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Handle preflight requests
app.options('*', cors());

console.log('=== RAILWAY SERVER STARTING ===');
console.log('Port:', port);
console.log('Node version:', process.version);
console.log('Environment:', process.env.NODE_ENV || 'development');

// Basic HTTP endpoints
app.get('/', (req, res) => {
  res.json({
    message: 'Socket.IO server is running!',
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

// Error handling
server.on('error', (err) => {
  console.error('Server error:', err);
  console.error('Error details:', err.message);
  console.error('Error code:', err.code);
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

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

// Global error handling
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  console.error('Stack trace:', err.stack);
  // Don't exit immediately, let the server try to continue
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Don't exit immediately, let the server try to continue
});
