console.log('=== BASIC NODE.JS TEST ===');
console.log('Step 1: Test script loaded');
console.log('Node.js version:', process.version);
console.log('Platform:', process.platform);
console.log('Architecture:', process.arch);
console.log('Current directory:', process.cwd());
console.log('Environment variables:');
console.log('- PORT:', process.env.PORT);
console.log('- NODE_ENV:', process.env.NODE_ENV);
console.log('==============================');

// Test basic Node.js functionality
try {
  console.log('Step 2: Testing basic modules...');
  const fs = require('fs');
  const path = require('path');
  console.log('Step 3: Basic modules loaded successfully');
  
  console.log('Step 4: Testing file system access...');
  const files = fs.readdirSync('.');
  console.log('Step 5: Directory contents:', files);
  
  console.log('Step 6: Testing HTTP module...');
  const http = require('http');
  console.log('Step 7: HTTP module loaded successfully');
  
  console.log('Step 8: All tests passed!');
  console.log('Step 9: Exiting successfully');
  
} catch (error) {
  console.error('Test failed:', error);
  console.error('Error stack:', error.stack);
  process.exit(1);
}
