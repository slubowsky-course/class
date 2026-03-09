import express from 'express';
import http from 'http';
import path from 'path';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const __dirname = import.meta.dirname;
app.use(express.static(path.join(__dirname, 'public')));

let chatters = [];

io.on('connection', socket => {
  console.log('got a connection');

  let name;
  socket.on('login', (n, callback) => {
    if (chatters.some(c => c === n)) {
      return callback(`${n} already in use. Please choose another`);
    }

    // console.log(n, 'joined');
    name = n;
    chatters.push(name);
    socket.broadcast.emit('info', `${name} has joined the chat`);

    socket.on('msg', msg => {
      io.emit('msg', `${name} says: ${msg}`);
    });

    socket.on('disconnect', () => {
      socket.broadcast.emit('info', `${name} has left the chat`);
      chatters = chatters.filter(c => c !== name);
    });

    callback();
  });
});

server.listen(80);
