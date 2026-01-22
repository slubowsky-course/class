import fs from 'fs';

const readStream = fs.createReadStream(process.argv[2], 'utf-8');
const writeStream = fs.createWriteStream(process.argv[3]);

// readStream.on('data', data => writeStream.write(data));
// readStream.on('end', () => writeStream.end());
readStream.pipe(writeStream);

readStream.on('error', err => console.error(err));
writeStream.on('error', err => console.error('oops', err));
writeStream.on('finish', () => console.log('done writing'));
