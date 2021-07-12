'use strict';

var theButton = document.getElementById('theButton');
var numClicksElement = document.getElementById('numClicks');

/*function handleClick() {
  numClicksElement.innerText = ++clicks;
}

theButton.addEventListener('click', handleClick);*/

/*theButton.addEventListener('click', function () {
  numClicksElement.innerText = ++clicks;
});*/

var clicks = 0;
theButton.addEventListener('click', () => {
  numClicksElement.innerText = ++clicks;
  // console.log(event);
});

