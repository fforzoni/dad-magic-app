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

// Enable CORS for all routes
app.use(cors());

// Root endpoint for health checks
app.get('/', (req, res) => {
  res.json({ 
    message: 'Dad Magic Socket Server is running!',
    status: 'OK',
    timestamp: new Date().toISOString(),
    port: process.env.PORT || 3001,
    environment: process.env.NODE_ENV || 'development'
  });
});

// Simple ping endpoint for Render health checks
app.get('/ping', (req, res) => {
  res.status(200).send('pong');
});

// Store active rooms and their clients
const rooms = new Map();

// Socket connection handling
io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Handle room joining
  socket.on('join-room', (data) => {
    const { roomId } = data;
    
    // Leave any existing rooms
    if (socket.roomId) {
      socket.leave(socket.roomId);
      removeClientFromRoom(socket.roomId, socket.id);
    }
    
    // Join new room
    socket.join(roomId);
    socket.roomId = roomId;
    
    // Add client to room
    if (!rooms.has(roomId)) {
      rooms.set(roomId, new Set());
    }
    rooms.get(roomId).add(socket.id);
    
    // Confirm room join
    socket.emit('room-joined', { roomId, clientId: socket.id });
    
    // Notify other clients in the room
    socket.to(roomId).emit('client-joined', { clientId: socket.id });
    
    console.log(`Client ${socket.id} joined room: ${roomId}`);
    console.log(`Room ${roomId} now has ${rooms.get(roomId).size} clients`);
  });

  // Handle movie selection
  socket.on('select-movie', (data) => {
    const { roomId, movie, clientId } = data;
    
    console.log(`Movie selected in room ${roomId}: ${movie.title} by client ${clientId}`);
    console.log(`Broadcasting to room ${roomId}, current clients:`, Array.from(rooms.get(roomId) || []));
    
    // Broadcast movie selection to all clients in the room (except sender)
    socket.to(roomId).emit('movie-selected', {
      roomId,
      movie,
      clientId,
      timestamp: Date.now()
    });
    
    // Also emit to sender for confirmation
    socket.emit('movie-selected', {
      roomId,
      movie,
      clientId,
      timestamp: Date.now()
    });
    
    console.log(`Movie selection broadcasted for: ${movie.title}`);
  });

  // Handle custom messages
  socket.on('send-message', (data) => {
    const { roomId, message, clientId } = data;
    
    console.log(`Message in room ${roomId}: ${message} from client ${clientId}`);
    
    // Broadcast message to all clients in the room
    io.to(roomId).emit('receive-message', {
      roomId,
      message,
      clientId,
      timestamp: Date.now()
    });
  });

  // Handle room leaving
  socket.on('leave-room', (data) => {
    const { roomId } = data;
    
    if (socket.roomId === roomId) {
      socket.leave(roomId);
      removeClientFromRoom(roomId, socket.id);
      socket.roomId = null;
      
      console.log(`Client ${socket.id} left room: ${roomId}`);
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
    
    // Remove client from room
    if (socket.roomId) {
      removeClientFromRoom(socket.roomId, socket.id);
      
      // Notify other clients in the room
      socket.to(socket.roomId).emit('client-left', { clientId: socket.id });
    }
  });
});

// Helper function to remove client from room
function removeClientFromRoom(roomId, clientId) {
  if (rooms.has(roomId)) {
    const room = rooms.get(roomId);
    room.delete(clientId);
    
    // Remove room if empty
    if (room.size === 0) {
      rooms.delete(roomId);
      console.log(`Room ${roomId} deleted (empty)`);
    } else {
      console.log(`Room ${roomId} now has ${room.size} clients`);
    }
  }
}

// API endpoints for monitoring
app.get('/status', (req, res) => {
  const status = {
    totalConnections: io.engine.clientsCount,
    activeRooms: Array.from(rooms.entries()).map(([roomId, clients]) => ({
      roomId,
      clientCount: clients.size
    })),
    timestamp: new Date().toISOString()
  };
  
  res.json(status);
});

app.get('/rooms/:roomId', (req, res) => {
  const { roomId } = req.params;
  
  if (rooms.has(roomId)) {
    const room = rooms.get(roomId);
    res.json({
      roomId,
      clientCount: room.size,
      clients: Array.from(room),
      timestamp: new Date().toISOString()
    });
  } else {
    res.status(404).json({ error: 'Room not found' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

const PORT = process.env.PORT || 3001;

console.log('Starting socket server...');
console.log('Environment variables:');
console.log('- PORT:', process.env.PORT);
console.log('- NODE_ENV:', process.env.NODE_ENV);
console.log('Using port:', PORT);

server.listen(PORT, () => {
  console.log('==========================================');
  console.log(`✅ Socket server started successfully!`);
  console.log(`🌐 Server running on port: ${PORT}`);
  console.log(`🕐 Started at: ${new Date().toISOString()}`);
  console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🆔 Process ID: ${process.pid}`);
  console.log(`📡 Socket.IO server ready for connections`);
  console.log('==========================================');
}).on('error', (err) => {
  console.error('❌ Failed to start server:', err);
  console.error('Error details:', err.message);
  console.error('Error code:', err.code);
  process.exit(1);
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
