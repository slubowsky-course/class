/*let x = null;
//let y = x ? x : -1;
let y = x || -1;
//let y = x ?? -1;
console.log(y);*/

window.pcsApp = (function (theModule) {
  'use strict';

  /*return {
    a: () => console.log('a was called'),
    b: () => console.log('b was called')
  };*/

  theModule.a = () => console.log('a was called');
  theModule.b = () => console.log('b was called');

  return theModule;
}(window.pcsApp || {}));

window.pcsApp.a();
window.pcsApp.b();
