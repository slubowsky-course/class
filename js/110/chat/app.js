import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';

const app = express();

const __dirname = import.meta.dirname;
app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);
const io = new Server(server);

const chatters = [];
io.on('connection', socket => {
  let name;

  socket.on('login', (n, callback) => {
    if (chatters.indexOf(n) >= 0) {
      console.error(`duplicate name ${n}`);
      callback(`${n} is already in use. Please pick another username`);
      return;
    }

    name = n;
    chatters.push(name);
    socket.broadcast.emit('info', `${name} has joined the chat`);

    socket.on('msg', msg => {
      //socket.broadcast.emit('msg', msg);
      io.emit('msg', `${name} says: ${msg}`);
    });

    socket.on('disconnect', () => {
      socket.broadcast.emit('info', `${name} has left the chat`);
    });

    // success callback
    callback();
  });
});

server.listen(80);
