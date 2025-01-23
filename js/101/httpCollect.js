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

http.get(process.argv[2], response => {
  response.pipe(bl((err, data) => {
    if (err) {
      console.error('oops2', err);
    }

    data = data.toString();
    console.log(data.length);
    console.log(data);
  }));
}).on('error', e => console.error('oops1', e));
