import fs from 'fs';

const writeStream = fs.createWriteStream(process.argv[2]);

writeStream.write('Hello world');
writeStream.end();

writeStream.on('error', err => console.error('oops', err));
writeStream.on('finish', () => console.log('done writing'));

console.log('end of file');
