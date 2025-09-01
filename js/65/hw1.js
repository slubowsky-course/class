const dayUtils = (function() {
  'use strict';
  
  const days = ['Sunday', 'Monday', 'Tuesday'];

  function getDay(index) {
    return days[index - 1];
  }

  function getIndex(day) {
    foo();
    return days.findIndex(e => e === day) + 1;
  }

  function foo() {
    console.log('foo');
  }

  return {
    getDay,
    getIndex
  };
}());

// const dayUtils = getDayUtils();

console.log(dayUtils.getDay(2));
console.log(dayUtils.getIndex('Monday'));
