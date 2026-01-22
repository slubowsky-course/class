import fs from 'fs';

console.log('before reading');

let chunks = 0;

const readStream = fs.createReadStream(process.argv[2], 'utf-8');

setTimeout(() => {
  readStream.on('data', data => {
    console.log(`==========> ${++chunks}`, data);
  });

  readStream.on('error', err => console.error(err));
  readStream.on('end', () => console.log('done reading file'));
}, 1000);

console.log('after reading');
