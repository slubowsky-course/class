//import fs from 'node:fs';

'use strict'
const fs = require('fs');

const fileContents = fs.readFileSync(process.argv[2], 'utf-8');
console.log(fileContents.split('\n').length - 1);
