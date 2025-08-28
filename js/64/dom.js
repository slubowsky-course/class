'use strict';

(function() {
  const theButton = document.querySelector('#theButton');
  let clickCount = document.querySelector('#clickCount');

  let clicks = 0;

  theButton.addEventListener('click', () => clickCount.textContent = ++clicks);
}());
