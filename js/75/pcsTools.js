window.pcs = (function () {
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

  function getRandomColorPart() {
    return Math.floor(Math.random() * 256);
  }

  function getRandomColor() {
    let r = getRandomColorPart();
    let g = getRandomColorPart();
    let b = getRandomColorPart();
    return `rgb(${r}, ${g}, ${b})`;
  }

  const elementData = {};

  const speeds = {
    fast: 50,
    medium: 250,
    slow: 500
  };

  function getSpeed(speed) {
    if (typeof speed === 'number') {
      return speed;
    }
    return speeds[speed] || speeds['medium'];
  }

  return function (selector) {
    const element = document.querySelector(selector);

    const data = elementData[selector] = elementData[selector] || {};
    // const data = element.data = element.data || {};
    // const data = {};

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
      },
      sparkle: function (speed, duration) {
        const originalColor = getCss(element, 'color');

        const theInterval = setInterval(() => {
          setCss(element, 'color', getRandomColor());
        }, /*speed*/ /*speeds[speed] || speed*/ getSpeed(speed));

        setTimeout(() => {
          clearInterval(theInterval);
          setCss(element, 'color', originalColor);
        }, duration);

        return this;
      },
      data: function (key, value) {
        if(arguments.length === 2) {
          data[key] = value;
          //element[key] = value;

          console.log(elementData);

          return this;
        } else {
          return data[key];
          //return element[key];
        }
      }
    };
  };
}());
