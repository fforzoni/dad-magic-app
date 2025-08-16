const http = require('http');
const port = process.env.PORT || 3001;

console.log('Deploy server starting...');
console.log('Port:', port);
console.log('Node version:', process.version);

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Socket server is running!');
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
