window.pcs = function (selector) {
  'use strict';

  function setCss(element, property, value) {
    element.style[property] = value;
  }

  function getCss(element, property) {
    return getComputedStyle(element)[property];
  }

  function on(element, event, callback) {
    element.addEventListener(event, callback);
  }

  const element = document.querySelector(selector);

  return {
    /*setCss: (element, property, value) => element.style[property] = value,
    setCss,
    getCss,*/
    css: function (property, value) {
      if (arguments.length === 2) {
        setCss(element, property, value);
        return this;
      } else {
        return getCss(element, property, value);
      }
    },
    hide: function () {
      setCss(element, 'display', 'none');
      return this;
    },
    show: function () {
      setCss(element, 'display', 'block');
      return this;
    },
    on: function (event, callback) {
      on(element, event, callback);
      return this;
    },
    click: function (callback) {
      on(element, 'click', callback);
      return this;
    }
  };
};
