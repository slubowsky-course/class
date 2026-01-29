'use strict';

const fs = require('fs');
const path = require('path');

fs.readdir(process.argv[2], (err, files) => {
  if (err) {
    console.error(err);
  }

  //files.filter(f => f.endsWith(process.argv[3])).forEach(f => console.log(f));

  const filter = `.${process.argv[3]}`;
  files.filter(f => path.extname(f) == filter).forEach(f => console.log(f));
});
