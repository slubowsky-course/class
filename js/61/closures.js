'use strict';

function greet(name) {
  console.log(`hello ${name}`);
}

greet('Donald');

//const greeter = (name) => console.log(`hello ${name}`);

const greeter = function (name) {
  console.log(`hello ${name}`);
};

greeter('JD');

function getGreeter() {
  return function (name) {
    console.log(`hello ${name}`);
  };
}

let theGreeter = getGreeter();
theGreeter('Netanyahu');

function getBetterGreeter(name) {
  let z = 10;
  return function () {
    console.log('on line 29');
    console.log(`hello ${name} ${z}`);
  };
}

console.log('on line 34');
let theBetterGreeter = getBetterGreeter('Pelosi');
console.log('on line 36');
theBetterGreeter();
console.log('on line 38');

/*
let greetDonald = getBetterGreeter('Donald');
let greetJoe = getBetterGreeter('Joe');

// 100 lines later

greetDonald();
greetJoe();


function foo(x) {
  console.log(x);
  bar(x);
  console.log('back in foo');
}

function bar(y) {
  let z = y * 2;
  console.log(z);
}

foo(5);*/

//bar = {y = 5; z = 10}
//foo = {x = 5}
