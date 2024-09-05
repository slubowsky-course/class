(function () {
  'use strict';

  function ourMap(array, callback) {
    const result = [];
    array.forEach(e => result.push(callback(e)));
    return result;
  }

  const numbers = [2, 4, 6];

  function doubleIt(n) {
    return n * 2;
  }

  console.log(ourMap(numbers, doubleIt));

  console.log(ourMap(numbers, function (n) {
    return n * n;
  }));

  console.log(ourMap(numbers, n => `The number is ${n}`));

  const people = [
    { first: 'Joe', last: 'Biden' },
    { first: 'Kamala', last: 'Harris' }
  ];

  console.log(ourMap(people, p => `first: ${p.first} last: ${p.last}`));

  console.log(people.map(p => `first: ${p.first} last: ${p.last}`));
}());
