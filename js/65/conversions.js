'use strict';

let x = 5;
let y = '5';

console.log(typeof(x), typeof(y));

// ==     ! =
console.log(x == y);
console.log(x != y);

// = = =      ! = =
console.log(x === y);
console.log(x !== y);


/*const age = prompt("How old are you?");
if (age == 21) {
  alert("You are the lucky winner! You are 21!");
}*/

console.log(x - y);
console.log(x + y);

//let z = Number('5');
//let z = +'5';
let z = parseInt('5fdgg');
console.log(z, typeof(z));


let j = 5 - 'Joe';
j += 45;
console.log(j, typeof(j));
console.log(j === j);
console.log(isNaN(j));

console.log(('b' + 'a' + +'b' + 'a').toLowerCase());

let undefinedVariable;
console.log(undefinedVariable);

let nullVariable = null;
console.log(nullVariable);

let someVariable = undefined;
if (someVariable !== undefined && someVariable !== null) {
  console.log(someVariable, 'it has a value');
}

if (someVariable != null) {
  console.log(someVariable, 'it has a value');
}

////////////

let isRepublican = false;
if (isRepublican) {
  console.log('Yay!!');
}

if (5 > x) {
  console.log('5 > x');
}

//let d; // undefined
//let d = null;
//let d = NaN;
//let d = 0;
//let d = '';
//let d = false;

let d = () => {}

if (d) {
  console.log('d is true');
} else {
  console.log('d is false');
}

console.log(true + 1, false + 1);

let name = '';
if(name) {
  console.log(name);
} else {
  console.log('no name');
}

let age = false;
console.log('typeof age', typeof(age));
if(age !== null && age !== undefined) {
  console.log(age);
}
