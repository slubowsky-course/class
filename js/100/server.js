import http from 'http';

http.createServer((req, res) => {
  console.log(req.url);

  console.log(req.headers.host);

  const url = new URL(req.url, `http://${req.headers.host}/`);
  console.log(url.pathname);
  console.log(url.searchParams);

  res.setHeader('content-type', 'text/html');
  //res.statusCode = 200;
  /*res.writeHead(200, {
    'content-type': 'text/html'
  });*/

  switch (/*req.url*/ url.pathname) {
    case '/':
      res.writeHead(301, {
        location: '/index.html'
      });
      break;
    case '/index.html':
      res.write('<h1>Welcome to PCS</h1>');
      break;
    case '/about.html':
      res.write('<h2>PCS is a great place</h2>');
      break;
    case '/sayHi':
      res.write(`<h2>Hi ${url.searchParams.get('name') || ' Unknown person'}</h2>`);
      res.write(`You have ordered ${url.searchParams.get('num') || 0 } of ${url.searchParams.get('item') || 'nothing'}`);
      break;
    default:
      res.statusCode = 404;
      res.write('<h3 style="color: red;">404. This is not the page you are looking for...</h3>');
  }

  res.end();
}).listen(80);
