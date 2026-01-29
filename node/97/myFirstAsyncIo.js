/*import fs from 'fs/promises';

//async function doIt() {
  try {
    const fileContents = await fs.readFile(process.argv[2], 'utf-8');
    console.log(fileContents.split('\n').length - 1);
  } catch (e) {
    console.error(e);
  }
//}
//doIt();
//console.log('file end');*/

'use strict'
const fs = require('fs');
fs.readFile(process.argv[2], 'utf-8', (err, data) => {
  if (err) {
    return console.log(err)
  }
  console.log(data.split('\n').length - 1);
});
