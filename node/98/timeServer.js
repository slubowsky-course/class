import net from 'net';

//  "2013-07-06 17:42"

const server = net.createServer((socket)=> {
  const now = new Date();

  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const date = now.getDate().toString().padStart(2, '0');
  const hour = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');

  socket.end(`${year}-${month}-${date} ${hour}:${minutes}`);
}).listen(8000);
