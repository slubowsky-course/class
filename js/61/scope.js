var age = 212;
console.log(age, typeof age);
age = 'age';
console.log(age, typeof age);

////////////////////
//var x;
//var add2;
//var notLocalX;

//console.log(z);
console.log(x);
var x = 5;
// x = 5;

console.log(add(1, 2));

function add(a, b) {
  // var localX;
  console.log('in add');
  var localX = 5;
  return a + b;
}
//console.log(localX);

//console.log(add2(1, 2));
var add2 = function (a,b) {
  return a + b;
}
console.log(add2(1, 2));

for(var i = 0; i < 10; i++) {
  var notLocalX = 5;
  console.log(i);
}

console.log(notLocalX);

///////////////////////////

//console.log(x2);
let x2 = 5;
// x2 = 5;

console.log(add3(1, 2));

function add3(a, b) {
  console.log('in add');
  let localX2 = 5;
  return a + b;
}
//console.log(localX2);

//console.log(add4(1, 2));
let add4 = function (a, b) {
  return a + b;
}
console.log(add4(1, 2));

for (let i = 0; i < 10; i++) {
  console.log('');
  let notLocalX2 = 5;
  console.log(i);
}

//console.log(notLocalX2);

const PI = 3.14;
PI = 3.12;

