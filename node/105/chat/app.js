import express from 'express';
import http from 'http';
import path from 'path';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const __dirname = import.meta.dirname;
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
  console.log('got a connection');

  /*setInterval(() => {
    socket.emit('msg', 'hello from server');
  }, 1000);*/

  socket.on('msg', msg => {
    //socket.broadcast.emit('msg', msg);
    io.emit('msg', msg);
  });
});

server.listen(80);
