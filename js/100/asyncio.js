//import fs from 'fs';
/*const fs = require('fs');

fs.readFile(process.argv[2], 'utf-8', (err, data) => {
  if(err) {
    return console.error('Failed to read file ', err);
  }
  const numLines = data.split('\n');
  console.log(numLines.length - 1);
});*/

//const fs = require('fs/promises');
import fs from 'fs/promises';

//(async () => {
  try {
    const data = await fs.readFile(process.argv[2], 'utf-8');
    const numLines = data.split('\n');
    console.log(numLines.length - 1);
  } catch(e) {
      console.error('Failed to read file ', e);
  }
//})();
