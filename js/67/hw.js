'use strict';

const upper = ['A', 'B', 'C'];
const lower = ['a', 'b', 'c'];
const mixed = ['A', 'b', 'C'];

upper.push('D');
upper[3] = 'E';
//upper = ['d'];

function ourEvery(array, testCallback) {
  for (let i = 0; i < array.length; i++) {
    if (!testCallback(array[i])) {
      return false;
    }
  }
  return true;

  /*let someoneFailed = false;
  array.forEach(elem => {
    if (!testCallback(elem)) {
      someoneFailed = true;
    }
  });
  return !someoneFailed;*/
}

function isUpper(char) {
  return char === char.toUpperCase();
}

console.log('ourEvery(upper, isUpper)', ourEvery(upper, isUpper));
console.log('ourEvery(lower, isUpper)', ourEvery(lower, function (char) { return char === char.toUpperCase(); }));
console.log('ourEvery(mixed, isUpper)', ourEvery(mixed, char => char === char.toUpperCase()));

//////

function ourSome(array, testCallback) {
  for(let i = 0; i < array.length; i++) {
    if(testCallback(array[i])) {
      return true;
    }
  }
  return false;
}

console.log('ourSome(upper, isUpper)', ourSome(upper, isUpper));
console.log('ourSome(lower, isUpper)', ourSome(lower, isUpper));
console.log('ourSome(mixed, isUpper)', ourSome(mixed, isUpper));

//////////////

function onlyIf(array, testCallback, actionCallback) {
  array.forEach(elem => {
    if(testCallback(elem)) {
      actionCallback(elem);
    }
  });
}

function printIt(it) {
  console.log(it);
}

console.log('onlyIf(upper, isUpper, printIt)');
onlyIf(upper, isUpper, printIt);

console.log('onlyIf(lower, isUpper, printIt)');
onlyIf(lower, isUpper, printIt);

console.log('onlyIf(mixed, isUpper, printIt)');
onlyIf(mixed, isUpper, console.log);

//const uppers = upper.filter(isUpper);
//uppers.forEach(printIt);

console.log('built in filter and forEach - upper');
upper.filter(isUpper)
  .forEach(printIt);

console.log('built in filter and forEach - lower');
lower.filter(isUpper)
  .forEach(printIt);

console.log('built in filter and forEach - mixed');
mixed.filter(isUpper)
  .forEach(printIt);
