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

try {
  // Import and start the server
  require('./socketServer.js');
  console.log('Server startup script completed successfully');
} catch (error) {
  console.error('Failed to start server:', error);
  console.error('Error stack:', error.stack);
  process.exit(1);
}
