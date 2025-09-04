//window.app = (function (theModule) {
  //'use strict';

  /*return {
    c: () => console.log('In function c'),
    d: () => console.log('In function d')
  };*/

  //theModule.a = () => console.log('In function two a');
  // theModule.c = () => console.log('In function two c');
  //theModule.d = () => console.log('In function two d');

  //return theModule;
//}(window.app || {}));

//window.app.c();
//window.app.d();

window.app = window.app || {};

window.app.second = (function (theModule) {
  'use strict';

  theModule.a = () => console.log('In function two a');
  theModule.d = () => console.log('In function two d');

  return theModule;
}(window.app.second || {}));
