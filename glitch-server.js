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

const port = process.env.PORT || 3000;

// Enable CORS
app.use(cors({
  origin: ["https://golden-fenglisu-91831d.netlify.app", "http://localhost:3000", "http://localhost:3001", "http://localhost:3002"],
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Handle preflight requests
app.options('*', cors());

console.log('=== GLITCH SERVER STARTING ===');
console.log('Port:', port);
console.log('Node version:', process.version);

// Basic HTTP endpoints
app.get('/', (req, res) => {
  res.json({
    message: 'Glitch Socket.IO server is running!',
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
});

// Start server
server.listen(port, () => {
  console.log(`Glitch Socket.IO server running on port ${port}`);
});
