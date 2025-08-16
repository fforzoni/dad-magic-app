console.log('=== RENDER SERVER STARTING ===');
console.log('Step 1: Server script loaded');
console.log('Node.js version:', process.version);
console.log('Platform:', process.platform);
console.log('Architecture:', process.arch);
console.log('Current directory:', process.cwd());
console.log('Environment variables:');
console.log('- PORT:', process.env.PORT);
console.log('- NODE_ENV:', process.env.NODE_ENV);
console.log('==============================');

try {
  console.log('Step 2: Loading HTTP module...');
  const http = require('http');
  console.log('Step 3: HTTP module loaded successfully');
  
  const PORT = process.env.PORT || 3001;
  console.log('Step 4: Port determined:', PORT);
  
  console.log('Step 5: Creating HTTP server...');
  const server = http.createServer((req, res) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    
    if (req.url === '/') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        message: 'Render server is running!',
        status: 'OK',
        timestamp: new Date().toISOString(),
        port: PORT,
        environment: process.env.NODE_ENV || 'development'
      }));
    } else if (req.url === '/ping') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('pong');
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not found', path: req.url }));
    }
  });
  
  console.log('Step 6: HTTP server created successfully');
  
  console.log('Step 7: Starting server...');
  server.listen(PORT, () => {
    console.log('==========================================');
    console.log('Render server started successfully!');
    console.log(`Server running on port: ${PORT}`);
    console.log(`Started at: ${new Date().toISOString()}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Process ID: ${process.pid}`);
    console.log('==========================================');
  });
  
  console.log('Step 8: Server.listen called');
  
  server.on('error', (err) => {
    console.error('Server error:', err);
    console.error('Error details:', err.message);
    console.error('Error code:', err.code);
    process.exit(1);
  });
  
  console.log('Step 9: Error handler attached');
  
} catch (error) {
  console.error('Failed to start server:', error);
  console.error('Error stack:', error.stack);
  process.exit(1);
}

console.log('Step 10: Server startup script completed');
