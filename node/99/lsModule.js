'use strict';

const fs = require('fs');
const path = require('path');

//import fs from 'fs';
//import path from 'path';

/*export default*/
module.exports = function filterLs(dir, ext, callback) {
  fs.readdir(dir, (err, files) => {
    if (err) {
      return callback(err);
    }

    const filter = `.${ext}`;
    callback(null, files.filter(f => path.extname(f) == filter));
  });
}

// module.exports.filterLs = filterLs;

/*filterLs('../98x', 'js', (err, files) => {
  console.log('oops', err, files);
});*/
