'use strict';

function multiply(x, y) {
  return x * y;
}

console.log(multiply(2, 5));

function getMultiplier() {
  return function(x, y) {
    console.log('in multiply');
    return x * y;
  };
}

const theMultiplier = getMultiplier();
console.log(theMultiplier(5, 3));

console.log(getMultiplier()(10,2));


function getBetterMultiplier(x) {
  /*const largeArray = [];
  for(let i = 0; i< 10000; i++) {
    largeArray.push(i);
  }
  // use large array*/

  return function(y) {
     return x * y;
  };
}

const multiplyByFive = getBetterMultiplier(5);
console.log(multiplyByFive(10));

const multipleBySix = getBetterMultiplier(6);
console.log(multipleBySix(3));
