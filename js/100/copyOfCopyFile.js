import fs from 'fs';

const readStream = fs.createReadStream(process.argv[2], 'utf-8');
const writeStream = fs.createWriteStream(process.argv[3]);

/*readStream.on('data', data => writeStream.write(data));
readStream.on('end', () => {
  console.log('finished reading file');
  writeStream.end();
});*/

readStream.pipe(writeStream);

readStream.on('error', err => console.error('OOPS', err));
writeStream.on('error', e => console.error('oops', e));
writeStream.on('finish', () => console.log('finished writing file'));

console.log('end of file');
