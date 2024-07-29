window.pcsApp = (function (theModule) {
  'use strict';

  /*return {
    c: () => console.log('c was called'),
    d: () => console.log('d was called')
  };*/

  theModule.c = () => console.log('c was called');
  theModule.d = () => console.log('d was called');

  return theModule;
}(window.pcsApp || {}));

window.pcsApp.c();
window.pcsApp.d();
