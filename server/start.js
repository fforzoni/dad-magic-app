#!/usr/bin/env node

// Simple startup script for Render
console.log('Starting Dad Magic Socket Server...');
console.log('Node.js version:', process.version);
console.log('Platform:', process.platform);
console.log('Architecture:', process.arch);
console.log('Current directory:', process.cwd());
console.log('Environment variables:');
console.log('- PORT:', process.env.PORT);
console.log('- NODE_ENV:', process.env.NODE_ENV);

// Check if we can access the socket server file
const fs = require('fs');
const path = require('path');

const socketServerPath = path.join(__dirname, 'socketServer.js');
console.log('Socket server path:', socketServerPath);

if (!fs.existsSync(socketServerPath)) {
  console.error('Socket server file not found!');
  process.exit(1);
}

console.log('Socket server file exists, attempting to start...');

try {
  // Import and start the server
  require('./socketServer.js');
  console.log('Server startup script completed successfully');
} catch (error) {
  console.error('Failed to start server:', error);
  console.error('Error stack:', error.stack);
  process.exit(1);
}
