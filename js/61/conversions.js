'use strict';

let x = 10;
let y = '10';

console.log(x, typeof(x));
console.log(y, typeof(y));

console.log(x == y);
console.log(x != y);

/*let age = prompt('How old are you?');
console.log(age, typeof(age));
console.log(`You will be 120 is ${120 - age} years`);*/

console.log(x === y);
console.log(x !== y);

console.log(x - y);
console.log(x + y);

console.log(Number('50a'), typeof(Number('50a')));
console.log(+'50a', typeof(+'50a'));
console.log(parseInt('50a'), typeof(parseInt('50a')));

let a = 'foo' - 'bar';
let b = 'a' - 'b';
console.log(a,b);
console.log(a == b);

if (a == NaN) {
  console.log('a is NaN #1');
}
if (isNaN(a)) {
  console.log('a is NaN #2');
}

console.log(a + 5);
a = 17;
console.log(a);

console.log(('b' + 'a' + +'b' + 'a').toLowerCase());


let c = undefined;// = undefined;
let d = null;

console.log(c, d);

if (c !== undefined && c !== null) {
  console.log('c has a value');
} else {
  console.log('c has no value');
}

if (c != undefined) {
  console.log('c has a value #1');
} else {
  console.log('c has no value #2');
}

let valid = true;
let foo = false;
console.log(valid, foo);

if (valid) {
  console.log('its valid');
} else {
  console.log('Its not valid');
}

//let isItFalse = false;
//let isItFalse = 0;
//let isItFalse = '';
//let isItFalse = null;
//let isItFalse = undefined;
let isItFalse = NaN;

if (isItFalse) {
  console.log('its not false');
} else {
  console.log('It is false');
}

c = '';
if (c) {
  console.log('Its has a value');
} else {
  console.log('It doesnt have a value');
}

console.log(true+1, false+1);
