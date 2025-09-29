(function () {
  'use strict';

  function ourMap(array, callback) {
    const results = [];
    array.forEach(n => results.push(callback(n)));
    return results;
  }

  function doubleIt(x) {
    return x * 2;
  }

  const numbers = [1, 2, 3, 4];
  console.log(ourMap(numbers, doubleIt));

  console.log(ourMap(numbers, function (x) {
    return x * 3;
  }));

  console.log(ourMap(numbers,x => x * 3));

  const people = [
    {first: 'Donald', last: 'Trump'},
    {first: 'JD', last: 'Vance'}
  ];

  console.log(ourMap(people, p => `first: ${p.first}, last: ${p.last}`));

  console.log(people.map(p => `first: ${p.first}, last: ${p.last}`));
}());
