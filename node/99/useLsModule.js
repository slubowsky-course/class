//import lsModule from './lsModule.js';

const lsModule = require('./lsModule.js');//.filterLs;

lsModule('../98', 'js', (err, files) => {
  console.log('oops', err, files);
});
