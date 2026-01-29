import http from 'http';
import fs from 'fs';
import path from 'path';

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript'
}

http.createServer((req, res) => {
  console.log(req.url);

  const mimeType = mimeTypes[path.extname(req.url)];
  if (mimeType) {
    res.setHeader('content-type', mimeType);
  }

  const readStream = fs.createReadStream(`public/${req.url}`);

  readStream.pipe(res);

  readStream.on('error', err => {
    let statusCode = 500;
    let message = 'oops. something went wrong.';

    //console.log(err);
    if (err.code === 'ENOENT') {
      statusCode = 404;
      message += ' 404 - Not found...';
    }

    res.statusCode = statusCode;
    res.end(message);
  });
}).listen(80);
