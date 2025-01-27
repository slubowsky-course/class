/*import fs from 'fs/promises';
import path from 'path';

export default async function filteredLs(directory, extension) {
  extension = `.${extension}`;
  let files = await fs.readdir(directory);
  return files.filter(f => path.extname(f) === extension);
}*/

/*try {
  const files = await filteredLs('c:\\xampp\\htdocs\\class\\js\\101x', 'js');
  console.log(files);
} catch(e) {
  console.error('oops', e);
}*/

'use strict';
const fs = require('fs');
const path = require('path');

module.exports = function filteredLs(directory, extension, callback) {
  extension = `.${extension}`;
  fs.readdir(directory, (err, files) => {
    if(err) {
      return callback(err);
    }
    callback(null, files.filter(f => path.extname(f) === extension));
  });
}

/*module.*/ //exports.filteredLs = filteredLs;

/*filteredLs('c:\\xampp\\htdocs\\class\\js\\101', 'js', (err, files) => {
  if (err) {
    console.error(err);
  } else {
    console.log(files);
  }
});*/
