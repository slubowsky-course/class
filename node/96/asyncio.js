/*import fs from 'fs';

console.log('before read');

fs.readFile(process.argv[2],(err, result) => {
  if(err) {
    return console.error(err);
  }

  console.log(result.toString());
});

console.log('after read');*/

import fs from 'fs/promises';

console.log('File start');

async function doTheAsyncStuff() {
  console.log('before read');

  const fileContents = await fs.readFile(process.argv[2], 'utf-8')
  console.log(fileContents);

  console.log('after read');
}

doTheAsyncStuff();
console.log('File end');
