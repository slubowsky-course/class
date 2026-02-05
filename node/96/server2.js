import http from 'http';

http.createServer((req, res) => {
  console.log(req.url);

  // req.headers.host
  const url = new URL(req.url, 'http://localhost');
  console.log(url.pathname);
  console.log(url.searchParams);
  console.log(url.searchParams.get('name'));

  res.setHeader('content-type', 'text/html');

  switch (/*req.url*/ url.pathname) {
    case '/':
      res.writeHead(301, {
        location: 'index.html'
      });
      break;
    case '/index.html':
      res.write('<h1>This is index.html</h1>');
      break;
    case '/contactus.html':
      res.write('<h2>This is contactus.html</h2>');
      break;
    case '/sayHello':
      res.write(`Hello ${url.searchParams.get('name') ?? 'stranger'} and hello to ${url.searchParams.get('spouse') ?? 'everyone'}`);
      break;
    default:
      res.statusCode = 404;
      res.write('<h2 style="color: red">404. We dont have that</h2>');
  }

  res.end();
}).listen(80);
