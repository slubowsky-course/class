'use strict';
const http = require('http');
const bl = require('bl');

const results = [];
let finished = 0;

function getData(url, index) {
  let text = '';
  http.get(url, response => {
    response.pipe(bl((err, text) => {
      if (err) {
        return console.error('oops2', e);
      }
      text = text.toString();
      results[index] = text;

      if (++finished === 3) {
        results.forEach(r => console.log(r));
      }
    }));
  }).on('error', e => console.error('oops', e));
}

for (let i = 2; i < process.argv.length; i++) {
  getData(process.argv[i], i - 2);
}
