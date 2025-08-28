/*'use strict';

var foo = 'foo';
const months = ['January', 'February', 'March'];

function getMonth(index) {
  return months[index - 1];
}

function getIndex(month) {
  return months.findIndex(m => m === month) + 1;
}

console.log(getMonth(3));
console.log(getIndex('February'));*/


/*const pcc_monthUtils = {
  months: ['January', 'February', 'March'],
  getMonth(index) {
    return this.months[index - 1];
  },
  getIndex(month) {
    return this.months.findIndex(m => m === month) + 1;
  }
};

console.log(pcc_monthUtils.getMonth(3));
console.log(pcc_monthUtils.getIndex('February'));*/

// IIFE
const monthUtils = (function() {
  const months = ['January', 'February', 'March'];

  function foo() {
    console.log('foo');
  }

  return {
    getMonth(index) {
      return months[index - 1];
    },
    getIndex(month) {
      return months.findIndex(m => m === month) + 1;
    }
  };
}());

console.log(monthUtils.getMonth(3));
console.log(monthUtils.getIndex('February'));
