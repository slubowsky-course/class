'use strict';
const http = require('http');
const bl = require('bl');

let text = '';
http.get(process.argv[2], response => {
  /*response.setEncoding('utf-8');
  response.on('data', data => text += data);
  response.on('end', () => {
    console.log(text.length);
    console.log(text);
  });
  response.on('error', e => console.error('oops2', e));*/

  response.pipe(bl((err, text) => {
    if (err) {
      return console.error('oops2', e);
    }
    text = text.toString();
    console.log(text.length);
    console.log(text);
  }));
}).on('error', e => console.error('oops', e));
