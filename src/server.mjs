import * as fs from 'node:fs';
import path from 'node:path';
import * as http from 'node:http';
import * as https from 'node:https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const server = {};

server.httpsServerOptions = {
  key: fs.readFileSync(path.join(__dirname, '../https/key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '../https/cert.pem')),
};

server.httpServer = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      data: 'Hello World!',
    })
  );
});

server.httpsServer = https.createServer(
  server.httpsServerOptions,
  (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        data: 'Security!',
      })
    );
  }
);

server.init = () => {
  server.httpsServer.listen(8001);
  server.httpServer.listen(8000);
};
