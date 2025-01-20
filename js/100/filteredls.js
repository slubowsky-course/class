/*const fs = require('fs');
const path = require('path');

fs.readdir(process.argv[2], (err, files) => {
  if (err) {
    return console.error(err);
  }
  //console.log(files);

  const ext = `.${process.argv[3]}`;
  files.forEach(f => {
    /*if (f.endsWith(process.argv[3])) {
      console.log(f);
    }* /
   if (path.extname(f) === ext) {
    console.log(f);
   }
  });
});*/

import fs from 'node:fs/promises';
import path from 'node:path';

try {
  const files = await fs.readdir(process.argv[2]);
  const ext = `.${process.argv[3]}`;
  /*files.forEach(f => {
   if (path.extname(f) === ext) {
    console.log(f);
   }
  });*/
  files.filter(f => path.extname(f) === ext)
    .forEach((f) => console.log(f));
} catch (e) {
  console.error(e);
}
