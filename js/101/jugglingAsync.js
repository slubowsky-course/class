//import http from 'http';

'use strict';
const http = require('http');

/*let fullData = '';

http.get(process.argv[2], response => {
  response.setEncoding('utf-8');
  response.on('data', data => fullData += data);
  response.on('error', e => console.error('oops2', e));
  response.on('end', () => {
    console.log(fullData.length);
    console.log(fullData);
  });
}).on('error', e => console.error('oops1', e));*/

const bl = require('bl');

const results = [];
let finished = 0;

function getUrl(url, index) {
  http.get(url, response => {
    response.pipe(bl((err, data) => {
      finished++;

      if (err) {
        console.error('oops2', err);
      }

      results[index] = (data.toString());

      if (finished === process.argv.length - 2) {
        results.forEach(r => console.log(r));
      }
    }));
  }).on('error', e => console.error('oops1', e));
}

for (let i = 0; i < process.argv.length; i++) {
  getUrl(process.argv[i + 2], i);
}
