import net from 'net';

//  "2013-07-06 17:42"

const sockets = [];

const server = net.createServer((socket)=> {
  sockets.push(socket);
  socket.on('data', data => sockets.filter(s => s !== socket).forEach(s => s.write(data)));
}).listen(8000);
