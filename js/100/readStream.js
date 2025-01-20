import fs from 'fs';

const readStream = fs.createReadStream(process.argv[2], 'utf-8');

//setTimeout(() => {
  let chunks = 0;
  readStream.on('data', data => {
    console.log(`----> chunk #${++chunks} - ${data}`);
  });

  readStream.on('error', err => console.error('OOPS', err));

  readStream.on('end', () => console.log('finished reading file'));
//}, 1000);

console.log('end of file');
