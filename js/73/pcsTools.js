window.pcsTools = (function () {
  'use strict';

  function get(selector) {
    return document.querySelector(selector);
  }

  function setCss(element, property, value) {
    element.style[property] = value;
  }

  function getCss(element, property) {
    return getComputedStyle(element)[property];
  }

  function on(element, event, callback) {
    element.addEventListener(event, callback);
  }

  return {
    get,
    setCss,
    getCss,
    on
  };
}());
