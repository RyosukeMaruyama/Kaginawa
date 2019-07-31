const http = require('http');
const { spawn } = require('child_process');

// Proxy a local server to Serveo.net
const serveo = spawn('ssh', ['-R', '80:localhost:8080', 'serveo.net']);
serveo.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('OK');
})

server.listen(8080);