window.pcsApp = window.pcsApp || {};

window.pcsApp.model = (function (theModule) {
  'use strict';

  theModule.a = () => console.log('model a called');

  return theModule;
 }(window.pcsApp.model || {}));
