const http = require('http');

const PORT = 3000;

const server = http.createServer((request, response) => {
  response.setHeader('Content-Type', 'text/plain; charset=utf-8');
  response.write('Hello from Node.js web server!\n');
  response.write(`Request Method: ${request.method}\n`);
  response.write(`Request URL: ${request.url}\n`);
  response.end('Response completed successfully.');
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
