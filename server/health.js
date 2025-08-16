// Simple health check for Render
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.version,
    platform: process.platform,
    arch: process.arch
  }));
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Health check server running on port ${PORT}`);
  console.log('Health check endpoint available at /');
});
