window.app = (function getCaseInsensitiveUtils(theModule, theAlert) {
  'use strict';

  let numberOfTimesCalled = 0;

  function caseInsensitiveCompare(a, b) {
    numberOfTimesCalled++;
    console.log(`numberOfTimesCalled ${numberOfTimesCalled}`);
    return a.toUpperCase() === b.toUpperCase();
  }

  /*return {
    caseInsensitiveCompare
  };*/
  theModule.caseInsensitiveCompare = caseInsensitiveCompare;
  theModule.showMessage = msg => theAlert(msg);

  return theModule;
}(window.app || {}, /*alert*/msg => console.log(msg)));

//const utils = getCaseInsensitiveUtils();

console.log(app.caseInsensitiveCompare('water', 'WaTeR'));
console.log(app.caseInsensitiveCompare('joe', 'Kamala'));

//console.log(getCaseInsensitiveUtils().caseInsensitiveCompare('water', 'WaTeR'));

console.log(app.caseInsensitiveCompare('joe', 'Kamala'));
