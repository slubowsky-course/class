/*let x = 0;
// let y = x ? x : 10;
//let y = x || 10;
let y = x ?? 10;

console.log(y)*/

//window.app = (function (theModule) {
//  'use strict';

/*let x = 5;
function foo() {}*/

/*return {
  a: () => console.log('In function a'),
  b: () => console.log('In function b')
};*/

//  theModule.a = () => console.log('In function one a');
// theModule.b = () => console.log('In function one b');

//  return theModule;
//}(window.app || {}));

//window.app.a();
//window.app.b();

window.app = window.app || {};

window.app.first = (function (theModule, theAlert) {
  'use strict';

  theModule.a = () => console.log('In function one a');
  theModule.b = () => console.log('In function one b');

  theModule.message = msg => theAlert(msg);

  return theModule;

}(window.app.first || {}, /*alert*/console.log));
