'use strict';

/*xjshint plusplus: true, undef: true, devel: true*/
console.log('Hello World');
// another line
/* another */

var x = 5
/*jshint -W117*/
y = 2 // xjshint ignore:line
/*xjshint +W117*/

var name = 'Joe';
nam = 'Kamala';

console.log(x + y);

var i = 0;
for (i = 0; i < 10; i++) {
  console.log(i);
}