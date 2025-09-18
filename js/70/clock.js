/*window.pcsClock = function (parent) {
  'use strict';

  parent = parent || document.body;

  const clock = document.createElement('div');

  /*clock.style.backgroundColor = 'black';
  clock.style.color = 'red';
  clock.style.display = 'inline-block';
  clock.style.padding = '1em';
  clock.style.fontSize = '2em';
  clock.style.fontWeight = 'bold';
  clock.style.fontFamily = 'monospace';* /
  clock.className = 'clock';

  parent.appendChild(clock);

  function updateClock() {
    clock.innerText = new Date().toLocaleTimeString();
  }

  setInterval(updateClock, 1000);

  updateClock();
};*/

/* global $ */
window.pcsClock = function (parent) {
  'use strict';

  parent = parent || document.body;

  const clock = $('<div></div>');

  clock.css('backgroundColor', 'black');
  clock.css('color', 'red');
  clock.css('display', 'inline-block');
  clock.css('padding', '1em');
  clock.css('fontSize', '2em');
  clock.css('fontWeight', 'bold');
  clock.css('fontFamily', 'monospace');
  //clock.addClass('clock');

  $(parent).append(clock);

  function updateClock() {
    clock.text(new Date().toLocaleTimeString());
  }

  setInterval(updateClock, 1000);

  updateClock();
};
