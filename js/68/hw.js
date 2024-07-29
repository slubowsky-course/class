const dayUtils = (function () {
  'use strict';

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  function getDayIndex(day) {
    return days.findIndex(d => d === day) + 1;
  }

  function getDay(index) {
    return days[index - 1];
  }

  console.log(getDayIndex('Tuesday'));
  console.log(getDay(3));

  return {
    getDayIndex,
    getDay
  };
}());

// console.log(getDayUtils().getDayIndex('Wednesday'));

//const dayUtils = getDayUtils();

console.log(dayUtils.getDayIndex('Tuesday'));
console.log(dayUtils.getDay(3));
