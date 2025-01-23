/*const response = await fetch(process.argv[2]);
const data = await response.text();
console.log(data);*/

//import http from 'http';

'use strict';
const http = require('http');

http.get(process.argv[2], response => {
  response.setEncoding('utf-8');
  response.on('data', data => console.log(data/*.toString()*/));
  response.on('error', e => console.error('oops2', e));
}).on('error', e => console.error('oops1', e));
