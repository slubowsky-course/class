import fs from 'fs';

const writeStream = fs.createWriteStream(process.argv[2]);

writeStream.write('Hello World!');
writeStream.end();

writeStream.on('error', e => console.error('oops', e));
writeStream.on('finish', () => console.log('finished writing file'));

console.log('end of file');
