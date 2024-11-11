(function () {
  'use strict';

  const theCanvas = document.querySelector('#theCanvas');
  const context = theCanvas.getContext('2d');

  function resizeCanvas() {
    theCanvas.width = window.innerWidth;
    theCanvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);

  resizeCanvas();

  const RADIUS = 50;
  let x = RADIUS;
  let y = RADIUS;
  let dx = 1;
  let dy = 2.5;
  setInterval(() => {
    context.clearRect(0, 0, theCanvas.width, theCanvas.height);
    context.beginPath();
    context.fillStyle = 'red';

    x += dx;
    y += dy;


    if (x >= theCanvas.width - RADIUS || x <= RADIUS) {
      dx = -dx;
    }

    if (y >= theCanvas.height - RADIUS || y <= RADIUS) {
      dy = -dy;
    }

    context.arc(x, y, RADIUS, 0, Math.PI * 2);
    context.fill();
  }, 1);

}());
