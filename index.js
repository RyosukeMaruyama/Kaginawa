const http = require('http');
const { spawn, execSync } = require('child_process');

if (process.argv[2] === undefined) {
  console.log('Please input command that run.');
  return
}
const cmd = process.argv[2];

// Proxy a local server to Serveo.net
const serveo = spawn('ssh', ['-R', '80:localhost:8080', 'serveo.net']);
serveo.stdout.on('data', (data) => {
  console.log(`serveo: ${data}`);
});

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  const stdout = execSync(cmd).toString('utf8');
  console.log(stdout);
  res.end('OK');
})

server.listen(8080);