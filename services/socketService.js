import io from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.roomId = null;
    this.onMovieSelectedCallback = null;
  }

  // Connect to the socket server
  connect(roomId = 'default-room') {
    try {
      // Use the computer's IP address for network access
      const SOCKET_SERVER_URL = 'http://192.168.1.99:3001';
      
      this.socket = io(SOCKET_SERVER_URL, {
        transports: ['websocket'],
        autoConnect: true,
      });

      this.roomId = roomId;

      this.socket.on('connect', () => {
        console.log('Connected to socket server');
        this.isConnected = true;
        
        // Join the room
        this.socket.emit('join-room', { roomId: this.roomId });
        
        // Call connect callback if set
        if (this.onConnectCallback) {
          this.onConnectCallback();
        }
      });

      this.socket.on('disconnect', () => {
        console.log('Disconnected from socket server');
        this.isConnected = false;
        
        // Call disconnect callback if set
        if (this.onDisconnectCallback) {
          this.onDisconnectCallback();
        }
      });

      this.socket.on('error', (error) => {
        console.error('Socket error:', error);
      });

      // Listen for movie selection from other clients
      this.socket.on('movie-selected', (data) => {
        console.log('🎬 MOVIE SELECTED EVENT RECEIVED!');
        console.log('Event data:', data);
        console.log('Callback exists:', !!this.onMovieSelectedCallback);
        
        if (this.onMovieSelectedCallback) {
          console.log('Calling movie selection callback...');
          this.onMovieSelectedCallback(data.movie);
        } else {
          console.log('❌ No movie selection callback set!');
        }
      });

      // Listen for room join confirmation
      this.socket.on('room-joined', (data) => {
        console.log('Joined room:', data.roomId);
      });

      // Listen for other clients joining the room
      this.socket.on('client-joined', (data) => {
        console.log('Client joined room:', data.clientId);
      });

      // Listen for other clients leaving the room
      this.socket.on('client-left', (data) => {
        console.log('Client left room:', data.clientId);
      });

    } catch (error) {
      console.error('Error connecting to socket server:', error);
    }
  }

  // Disconnect from the socket server
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  // Send movie selection to other clients in the room
  selectMovie(movie) {
    console.log('📡 selectMovie called with:', movie.title);
    console.log('Socket exists:', !!this.socket);
    console.log('Socket connected:', this.isConnected);
    console.log('Room ID:', this.roomId);
    
    if (this.socket && this.isConnected) {
      const data = {
        roomId: this.roomId,
        movie: movie,
        timestamp: Date.now(),
        clientId: this.socket.id,
      };
      
      console.log('📤 Emitting select-movie event with data:', data);
      this.socket.emit('select-movie', data);
      console.log('✅ Movie selection event emitted');
      return true;
    } else {
      console.warn('❌ Socket not connected. Cannot send movie selection.');
      return false;
    }
  }

  // Set callback for when a movie is selected by another client
  onMovieSelected(callback) {
    this.onMovieSelectedCallback = callback;
  }

  // Set callback for when connected
  onConnect(callback) {
    this.onConnectCallback = callback;
  }

  // Set callback for when disconnected
  onDisconnect(callback) {
    this.onDisconnectCallback = callback;
  }

  // Get connection status
  getConnectionStatus() {
    return this.isConnected;
  }

  // Get current room ID
  getRoomId() {
    return this.roomId;
  }

  // Change room
  changeRoom(newRoomId) {
    if (this.socket && this.isConnected) {
      // Leave current room
      this.socket.emit('leave-room', { roomId: this.roomId });
      
      // Join new room
      this.roomId = newRoomId;
      this.socket.emit('join-room', { roomId: this.roomId });
      
      console.log('Changed to room:', newRoomId);
    }
  }

  // Send custom message to room
  sendMessage(message) {
    if (this.socket && this.isConnected) {
      const data = {
        roomId: this.roomId,
        message: message,
        timestamp: Date.now(),
        clientId: this.socket.id,
      };
      
      this.socket.emit('send-message', data);
    }
  }

  // Listen for custom messages
  onMessage(callback) {
    if (this.socket) {
      this.socket.on('receive-message', callback);
    }
  }
}

// Export a singleton instance
export const socketService = new SocketService();
