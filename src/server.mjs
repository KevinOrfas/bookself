import * as fs from 'node:fs';
import path from 'node:path';
import * as http from 'node:http';
import * as https from 'node:https';
import { fileURLToPath } from 'url';
import { log } from 'node:console';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const server = {};

server.unifiedServer = (req, res) => {
  log('Unified server');
  if (req.method === 'GET') {
    if (req.url === '/') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          data: 'Plain server!',
        })
      );
      return;
    }
    if (req.url === '/bookself') {
      res.writeHead(200, { 'Content-Type': 'plain/html' });
      res.write('<h1>Hi</h1>');
      res.write('<ul>');
      res.write('<li>');
      res.write('</li>');
      res.write('</ul>');
      res.end();
      return;
    }
  }

  if (req.method === 'POST') {
    if (req.url === '/') {
      // res.writeHead(200, { 'Content-Type': 'application/json' });
      // res.end(
      //   JSON.stringify({
      //     data: 'Plain server!',
      //   })
      // );
    }
  }
};

server.httpsServerOptions = {
  key: fs.readFileSync(path.join(__dirname, '../https/key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '../https/cert.pem')),
};

server.httpServer = http.createServer((req, res) => {
  server.unifiedServer(req, res);
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
  // server.httpsServer.listen(8001);
  server.httpServer.listen(8000);
};
