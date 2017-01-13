// jshint esversion: 6
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const { Server : WebSocketServer } = require('ws');
const server = require('http').createServer();
const wss = new WebSocketServer({ server });

app.get('/api/hello', (req, res) => {
  const hello = 'world';
  res.json({ hello });
});

wss.on('connection', client => {

  client.on('message', message  => {
    console.log('received: %s', message);
  });

  client.send('connected to ws server');
});

server.on('request', app);
server.listen(PORT, _ =>
  console.log('Server Listening on ' + server.address().port)
);
