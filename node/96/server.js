import http from 'http';
//const http = require('http');

console.log(process.argv);
const greeting = process.argv[2] ?? 'Ola';

http.createServer((req, res)=> {
  res.setHeader('content-type', 'text/html');
  //res.statusCode = 404;
  /*res.writeHead(404, {
    'content-type': 'text/html'
  });*/
  res.write(`${greeting}! Have a nice day`);
  //res.write('404. No such page. Have a nice day');
  //res.end(' and Goodbye!!!');

  /*res.setHeader('content-type', 'application/json');
  const potus = {
    first: 'Donald',
    last: 'Trump'
  };

  res.end(JSON.stringify(potus));*/
}).listen(80);
