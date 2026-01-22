import fs from 'node:fs';

//const fileContents = fs.readFileSync(process.argv[2]);
//console.log(fileContents.toString());

console.log('before read');

const fileContents = fs.readFileSync(process.argv[2], 'utf-8');
console.log(fileContents);

console.log('after read');
