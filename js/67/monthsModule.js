//'use strict';

//x = 5;
//var y = 10;

/*const months = ['January', 'February', 'March', 'April'];

function getMonth(index) {
  return months[index - 1];
}

function getMonthIndex(month) {
  const index = months.findIndex(m => m === month);
  return index + 1;
}

console.log(getMonth(2));
console.log(getMonthIndex('February'));*/

/*const pcs_monthUtils = {
  months: ['January', 'February', 'March', 'April'],
  getMonth(index) {
    return this.months[index - 1];
  },
  getMonthIndex(month) {
    const index = this.months.findIndex(m => m === month);
    return index + 1;
  }
};

console.log(pcs_monthUtils.getMonth(2));
console.log(pcs_monthUtils.getMonthIndex('February'));*/

// IIFE
const pcs_monthUtils = (function () {
  const months = ['January', 'February', 'March', 'April'];

  function getMonth(index) {
    return months[index - 1];
  }

  function foo() {
    console.log('foo was called');
  }

  return {
    getMonth,
    getMonthIndex(month) {
      foo();
      const index = months.findIndex(m => m === month);
      return index + 1;
    }
  };
}());

//const pcs_monthUtils = getMonthUtils();

console.log(pcs_monthUtils.getMonth(2));
console.log(pcs_monthUtils.getMonthIndex('February'));
