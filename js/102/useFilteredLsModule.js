/*import filteredLs from "./filteredLsModule.js";

try {
  const files = await filteredLs('c:\\xampp\\htdocs\\class\\js\\101', 'js');
  console.log(files);
} catch (e) {
  console.error('oops', e);
}*/

'use strict';
const filteredLs = require('./filteredLsModule');//.filteredLs;

filteredLs(process.argv[2], process.argv[3], (err, files) => {
  if (err) {
    console.error(err);
  } else {
    files.forEach(file => console.log(file));
  }
});
