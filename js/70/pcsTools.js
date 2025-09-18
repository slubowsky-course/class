window.pcs = function (selector) {
  'use strict';

  const speeds = {
    fast: 100,
    medium: 250,
    slow: 500
  };

  function getElement(selector) {
    return document.querySelector(selector);
  }

  function setCss(element, property, value) {
    //console.log('in setCss', property);
    element.style[property] = value;
  }

  function getCss(element, property) {
    //return element.style[property];
    return getComputedStyle(element)[property];
  }

  function on(element, event, callback) {
    element.addEventListener(event, callback);
  }

  function pickRandomColor() {
    return `#${Math.floor(Math.random() * 16777216).toString(16).padStart(6, '0')}`;
  }

  function getSpeed(speed) {
    if (typeof speed === 'number')
      return speed;

    return speeds[speed] || speeds.medium;
  }

  const element = getElement(selector);

  return {
    // getElement: getElement,
    /*setCss,
    getCss,*/
    css: function (property, value) {
      if (arguments.length === 1) {
        return getCss(element, property);
      } else {
        setCss(element, property, value);
        return this;
      }
    },
    on: function (event, callback) {
      on(element, event, callback);
      return this;
    },
    click: function (callback) {
      on(element, 'click', callback);
      return this;
    },
    hide: function () {
      setCss(element, 'display', 'none');
      return this;
    },
    show: function() {
      setCss(element, 'display', 'inline-block');
      return this;
    },
    sparkle: function (speed, duration) {
      const originalColor = getCss(element, 'color');

      const interval = setInterval(() => {
        setCss(element, 'color', pickRandomColor());
      }, getSpeed(speed));

      setTimeout(()=> {
        clearInterval(interval);
        setCss(element, 'color', originalColor);
      }, duration);

      return this;
    }
  };
};
