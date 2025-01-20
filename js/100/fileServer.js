import http from 'http';
import fs from 'fs';
import path from 'path';

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript'
};

http.createServer((req, res) => {
  console.log(req.url);
  const ext = path.extname(req.url);
  const mimeType = mimeTypes[ext];
  console.log(mimeType);
  if (mimeType) {
    res.setHeader('content-type', mimeType);
  }

  const readStream = fs.createReadStream(`public\\${req.url}`);
  readStream.pipe(res);

  readStream.on('error', e => {
    res.writeHead(500, {
      'content-type': 'text/html'
    });
    res.end('<h3 style="color: red;">error...</h3>');
  });
}).listen(80);
