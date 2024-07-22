'use strict';

greet('Joe');

function greet(name) {
  console.log(`Hello ${name}`);
}

greet('Joe');


// doGreet();

const doGreet = function() {
  console.log('Hello 2');
};

doGreet();

function getGreeter() {
  return function () {
    console.log('Hello 3');
  };
}

const theGreeter = getGreeter();
theGreeter();

/////////////////////

function getBetterGreeter() {
  return function (name) {
    console.log(`Hello ${name}`);
  };
}

const betterGreeter = getBetterGreeter();
betterGreeter('Kamala');

/////////////

function getBestGreeter(name) {
  let x = 50;
  // name = 'donald'
  return function () {
    console.log(`Hello ${name} ${x}`);
  };
}

const bestGreeter = getBestGreeter('Donald');
bestGreeter();
console.log('done');

const sayHelloToJoe = getBestGreeter('Joe');
sayHelloToJoe();
sayHelloToJoe();

const sayHelloToKamala = getBestGreeter('Kamala');
sayHelloToKamala();
sayHelloToKamala();

////////////////////////////////

function multiply(x,y) {
  return x * y;
}

console.log(multiply(2,5));

function getMultiplier() {
  return function (x,y) {
    return x * y;
  };
}

const theMultiplier = getMultiplier();
console.log(theMultiplier(5,5));

function getBestMuliplier(x) {
  return function (y) {
    return x * y;
  };
}


const multiplyBy5 = getBestMuliplier(5);
console.log(multiplyBy5(2));
console.log(multiplyBy5(3));

const multiplyBy10 = getBestMuliplier(10);
console.log(multiplyBy10(2));
console.log(multiplyBy10(3));

///////////

/*function foo(x) {
  console.log(x);
  bar(x);
  console.log('more stuff');
}

function bar(y) {
  let z = y * 2;
  console.log(z);
}

foo(5);*/
