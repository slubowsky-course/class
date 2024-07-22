'use strict';

const someLetters = ['A', 'B', 'C'];

/*for(let i = 0; i < someLetters.length; i++) {
  console.log(someLetters[i]);
}

function printArray(anArray) {
  for (let i = 0; i < anArray.length; i++) {
    console.log(anArray[i]);
  }
}

printArray(someLetters);*/

function ourForEach(anArray, callback) {
  for (let i = 0; i < anArray.length; i++) {
    callback(anArray[i], i, anArray);
  }
}

function printIt(it, index, theArray) {
  console.log('our for each', it, index, theArray);
}

ourForEach(someLetters, printIt);
someLetters.forEach(printIt);

ourForEach(someLetters, console.log);
someLetters.forEach(console.log);

//console.log(1,2,3,'foo', 'bar');

ourForEach(someLetters, l => console.log(l));

//function foo (param) { return 5; }
//const foo = (param) => {
// return 5;
//}
//const foo = param => param + 1;
//console.log(foo(2));
//const bar = () => 5;
//const bar = (x, y) => 5;

////////////////////////

const numbers = [1,2,3,4,5,6,7,8,9];

function isEven(n) {
  return !(n % 2);
}

/*const evens = [];
for(let i = 0; i < numbers.length; i++) {
  if(isEven(numbers[i])) {
    evens.push(numbers[i]);
  }
}
console.log(evens);*/

function ourFilter(anArray, filterFunction) {
  const result = [];
  for (let i = 0; i < anArray.length; i++) {
    if (filterFunction(anArray[i])) {
      result.push(anArray[i]);
    }
  }
  return result;
}

const evens = ourFilter(numbers, isEven);
console.log(evens);

console.log(ourFilter(numbers, n => n % 2));

console.log(ourFilter(numbers, n => !isEven(n)));
