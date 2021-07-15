'use strict';

function greet() {
  console.log('Hello');
}

greet();

function getGreeter() {
  return function () {
    console.log('Hello');
  };

  //return greet; // no ()
}

let theGreeter = getGreeter();
theGreeter();

/////////

function getBetterGreeter() {
  return function (name) {
    console.log(`Hello ${name}`);
  };
}

let betterGreeter = getBetterGreeter();
betterGreeter('Joe');

////////////

function getBestGreeter(name) {
  return function () {
    console.log(`Hello ${name}`);
  };
}

let bestGreeter = getBestGreeter('Joe');
bestGreeter();

let sayHiToKamela = getBestGreeter('Kamala');
sayHiToKamela();


/////////////////

