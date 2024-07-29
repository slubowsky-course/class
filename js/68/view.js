window.pcsApp = window.pcsApp || {};

window.pcsApp.view = (function (theModule) {
  'use strict';

  theModule.a = () => console.log('view a called');

  return theModule;
}(window.pcsApp.view || {}));
