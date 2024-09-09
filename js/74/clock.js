window.pcs = window.pcs || {};
/*window.pcs.clock = function (parent) {
  'use strict';

  parent = parent || document.body;

  const clockElem = document.createElement('div');
  parent.appendChild(clockElem);
  // parent.innerHtml += '<div></div>';

  /*clockElem.style.backgroundColor = 'black';
  clockElem.style.color = 'red';
  clockElem.style.padding = '1em';
  clockElem.style.display = 'inline-block';
  clockElem.style.fontSize = '2em';
  clockElem.style.fontWeight = 'bold';
  clockElem.style.fontFamily = 'monospace';* /
  clockElem.className = 'clock';

  function updateTime() {
    clockElem.innerText = new Date().toLocaleTimeString();
  }
  setInterval(updateTime, 1000);
  updateTime();
};*/

/* globals $*/
window.pcs.clock = function (selector) {
  'use strict';

  selector = selector || 'body';

  //$(selector).append('<div></div>');
  const clockElem = $('<div></div>').appendTo($(selector));
  clockElem.addClass('clock');

  function updateTime() {
    clockElem.text(new Date().toLocaleTimeString());
  }
  setInterval(updateTime, 1000);
  updateTime();
};
