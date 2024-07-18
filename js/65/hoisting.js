'use strict';
// var x;
// var z;
/*
function add(a,b) {
  return a + b;
}
*/
// var subtract

console.log(x);

var x = 5;
// x = 5;

console.log(x);

console.log(z);

for(var i = 0; i < 10; i++) {
  console.log(z);
  var z = i+100;
  // z = 1+100;
  console.log(z);
}

console.log(i, z);

console.log(add(1, 2));
function add(a,b) {
  return a + b;
}
console.log(add(1,2));

/*var subtract = function(a,b) {
  return a - b;
}*/
console.log(subtract);
//console.log(subtract(5, 3));
var subtract = (a, b) => a - b;
// subtract = (a, b) => a - b;
console.log(subtract(5,3));

function doSomething() {
  // var q;
  console.log('in doSomething', q);
  var q = 100;
  // q = 100;
  console.log(q);
  console.log('Doing something...');
}

doSomething();
//console.log(q);

///////
//console.log(lx);
let lx = 5;
console.log(lx);

for(let li = 0; li < 10; li++) {
  let lz = i + 100;
  console.log(lz);
}

//console.log(li, lz);

const PI = 3.14;
console.log(PI);
//PI = 3.2;
