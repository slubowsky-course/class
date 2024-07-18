'use strict';

var theButton = document.querySelector('#theButton');
var clickCount = document.querySelector('#clickCount');

var clicks = 0;

theButton.addEventListener('click', clickHandler);

function clickHandler(e) {
  // clickCount.textContent = ++clicks;
  clickCount.innerHTML = `<input value="${++clicks}" />`;
  console.log(e);
}

/*theButton.addEventListener('click', function() {
  var cc = document.querySelector('#clickCount');
  cc.textContent = ++clicks;
});*/

//theButton.addEventListener('click', () => clickCount.textContent = ++clicks);

///////////////

function add(a, b) {
  return a + b;
}

console.log(add(2, 2));
