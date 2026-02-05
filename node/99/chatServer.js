import net from 'net';

let sockets = [];
let chat = '';

const server = net.createServer((socket) => {
  sockets.push(socket);
  socket.on('data', data => {
    console.log(`there are ${sockets.length} sockets`);
    chat += data;
    sockets.filter(s => s !== socket).forEach(s => s.write(data));
  });

  socket.on('end', () => sockets = sockets.filter(s => s!== socket));

  socket.write(chat);
}).listen(8000);
