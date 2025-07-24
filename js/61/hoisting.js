'use strict';
// var a;
// var z;
// var multiply;

console.log(a);
// console.log(z);

var a = 5;
// a = 5;

console.log(a);

for(var i = 0; i < 10; i++) {
  var z = 10;
  // z = 10;
  console.log(z + i);
}

console.log(i, z);

function foo() {
  var f = 2;
  console.log('foo', f);
}

foo();
console.log(f);


/////////////////////////////////////

//console.log(x);
//console.log(b);
let b = 5;
console.log(b);

for (let j = 0; j < 10; j++) {
  let x = 10;
  console.log(x + j);
}

// console.log(j, x);

console.log(subtract(3,2));

function subtract(a,b) {
  return a - b;
}

// console.log(multiply(2, 5));

/*var multiply = function (x, y) {
  return x * y;
};*/
const multiply = (x,y) => x*y;

console.log(multiply(2,5));
