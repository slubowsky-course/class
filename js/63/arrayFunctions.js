'use strict';

const numbers = [1, 2, 3, 4, 5, 6];

for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i] * 2);
}


function doubleArray(array) {
  for (let i = 0; i < array.length; i++) {
    console.log(array[i] * 2);
  }
}

doubleArray(numbers);

function ourForEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    callback(array[i], i, array);
  }
}

function printIt(it, index, theArray) {
  console.log('->', it, index, theArray);
}

ourForEach(numbers, printIt);
ourForEach(numbers, x => console.log(x * 10));

numbers.forEach(printIt);
numbers.forEach((x, index, theArray) => console.log('****', x * 10, index, theArray));

ourForEach(numbers, console.log);
numbers.forEach(console.log);

console.log(1,10,100,100, 'foo');

/////////////////////

function ourFilter(array, testCallback) {
  const results = [];

  for(let i = 0; i < array.length; i++) {
    if (testCallback(array[i])) {
      results.push(array[i]);
    }
  }

  return results;
}

console.log(ourFilter(numbers, x => !(x % 2)));

function isOdd(x) {
  return x % 2;
}

console.log(ourFilter(numbers, isOdd));
console.log(ourFilter(numbers, x => !isOdd(x)));
