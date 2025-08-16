console.log('Ultra-simple server starting...');

const http = require('http');
const port = process.env.PORT || 3001;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello from Render!');
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
