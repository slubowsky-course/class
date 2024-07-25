'use strict';

(function () {
  const theButton = document.querySelector('#theButton');
  const clickCount = document.querySelector('#clickCount');

  let clicks = 0;

  theButton.addEventListener('click', () => clickCount.textContent = ++clicks);
}());
