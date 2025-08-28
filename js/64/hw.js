'use strict';

const upper = ['A', 'B', 'C'];
const lower = ['a', 'b', 'c'];
const mixed = ['A', 'b', 'C'];

// upper.push('D');
// console.log(upper);

function ourEvery(anArray, testCallback) {
  for(let i = 0; i < anArray.length; i++) {
    if (!testCallback(anArray[i])) {
      return false;
    }
  }

  return true;

  /*let allPassed = true;
  anArray.forEach(function (c) {
    if (!testCallback(c)) {
      allPassed = false;
    }
  });

  return allPassed;*/
}

function isUpper(char) {
  return char === char.toUpperCase();
}

console.log('ourEvery(upper, isUpper)', ourEvery(upper, isUpper));
console.log('ourEvery(lower, isUpper)', ourEvery(lower, isUpper));
console.log('ourEvery(mixed, isUpper)', ourEvery(mixed, isUpper));

console.log('upper.every(isUpper)', upper.every(isUpper));
console.log('lower.every(isUpper)', lower.every(isUpper));
console.log('mixed.every(isUpper)', mixed.every(isUpper));


function ourSome(anArray, testCallback) {
  for (let i = 0; i < anArray.length; i++) {
    if (testCallback(anArray[i]))
      return true;
  }

  return false;
}

console.log('ourSome(upper, isUpper)', ourSome(upper, isUpper));
console.log('ourSome(lower, isUpper)', ourSome(lower, isUpper));
console.log('ourSome(mixed, isUpper)', ourSome(mixed, isUpper));

console.log('upper.some(isUpper)', upper.some(isUpper));
console.log('lower.some(isUpper)', lower.some(isUpper));
console.log('mixed.some(isUpper)', mixed.some(isUpper));

function onlyIf(anArray, testCallback, actionCallback) {
  anArray.forEach(x => {
    if(testCallback(x)) {
      actionCallback(x);
    }
  });
}

function printIt(x) {
  console.log(x);
}

console.log('onlyIf(upper, isUpper, /*printIt*/ console.log)');
onlyIf(upper, isUpper, /*printIt*/ console.log);

console.log('onlyIf(lower, isUpper, printIt)');
onlyIf(lower, isUpper, printIt);

console.log('onlyIf(mixed, isUpper, printIt)');
onlyIf(mixed, isUpper, printIt);

/////////////////////////

const foo = x => console.log(x);
foo('foo');
const bar = (x,y) => console.log(x, y);

const foobar = x => x * 2; // function (x) { return x * 2; }
console.log(foobar(5));

const foobar2 = x => {
  return x * 3;
};

console.log(foobar2(5));

const another = () => console.log('another');
