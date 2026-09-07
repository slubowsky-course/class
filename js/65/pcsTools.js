/*export function setCss(element, property, value) {
  element.style[property] = value;
}

export function click(element, callback) {
  element.addEventListener('click', callback);
}

console.log('inside pcsTools');*/

function setCss(element, property, value) {
  element.style[property] = value;
}

function getCss(element, property) {
  // return element.style[property];
  return getComputedStyle(element)[property];
}

function on(element, eventType, callback) {
  element.addEventListener(eventType, callback);
}

/*
const pcsTools = {
  setCss,
  click(element, callback) {
    element.addEventListener('click', callback);
  }
};

export default pcsTools;
*/

function getRandomColor() {
  return `#${Math.floor(Math.random() * 16777217).toString('16').padStart(6, '0')}`;
}


export default function pcsTools(selector) {

  const element = document.querySelector(selector);

  return {
    /*setCss: (property, value) => setCss(element, property, value),
    getCss: (property) => getCss(element, property),*/
    css: function (property, value) {
      if (arguments.length < 2) {
        return getCss(element, property);
      }
      setCss(element, property, value);
      return this;
    },
    click(callback) {
      //element.addEventListener('click', callback);
      on(element, 'click', callback);
      return this;
    },
    on(eventType, callback) {
      //element.addEventListener(eventType, callback);
      on(element, eventType, callback);
      return this;
    },
    hide() {
      setCss(element, 'display', 'none');
      return this;
    },
    show() {
      setCss(element, 'display', 'inline-block');
      return this;
    },
    sparkle(speed, duration) {
      const originalColor = element.style['color']; //getCss(element, 'color');

      const interval = setInterval(() => {
        setCss(element, 'color', getRandomColor());
      }, speed);

      setTimeout(() => {
        clearInterval(interval);
        setCss(element, 'color', originalColor);
      }, duration);

      return this;
    }
  };
}
