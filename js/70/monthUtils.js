window.app = (function getMonthUtils(theModule) {
  'use strict';
  
  const months = ['January', 'February', 'March'];

  function getMonth(index) {
    return months[index - 1];
  }

  function getMonthIndex(month) {
    return months.findIndex(m => m === month) + 1;
  }

  /*return {
    getMonth,
    getMonthIndex
  };*/
  theModule.getMonth = getMonth;
  theModule.getMonthIndex = getMonthIndex;

  return theModule;
}(window.app || {}));


console.log(window.app.getMonth(3));
console.log(window.app.getMonthIndex('March'));

/*function doSomething(aFunction) {
  aFunction();
}*/

//function it() { console.log('did it'); }
//doSomething(it);


/*function getTheThingToReturn(x) {
  return function () {
    console.log(x);
  };
}

function doSomething2(y) {
  let giantThing = [];
  let x = 5;
  x += y;
  console.log(x);

  /*return function () {
    console.log('foo');//x);
  };*/
//return getTheThingToReturn(x);
//}

/*doSomething2(5);
doSomething2(5);

doSomething(() => doSomething2(5));

const callDoSomething2With5 = doSomething2.bind(null, 5);
callDoSomething2With5();
doSomething(callDoSomething2With5);*/

/*const theReturnedFunction = doSomething2(5);
doSomething2(10);
theReturnedFunction();*/
