//import http  from 'http';
const http = require('http');

http.createServer((req, res) => {
  //res.setHeader('content-type', 'text/html');
  //res.statusCode = 404;
  /*res.writeHead(404, {
    'content-type': 'text/html',
    'foo': 'bar'
  });*/
  //res.write('Hello World!!');
  //res.end('Hello World!!');

  res.setHeader('content-type', 'application/json');

  const potus = {
    first: 'Donald',
    last: 'Trump'
  };

  res.end(JSON.stringify(potus));
}).listen(80);
