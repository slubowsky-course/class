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
  let minY = RADIUS;

  let dx = 1;
  let dy = 3.5;
  setInterval(() => {
    context.clearRect(0, 0, theCanvas.width, theCanvas.height);
    context.beginPath();
    context.fillStyle = 'red';

    x += dx;
    y += dy;

    if (x >= theCanvas.width - RADIUS || x <= RADIUS) {
      dx = -dx;
    }

    if (y >= theCanvas.height - RADIUS || y <= minY) {
      dy = -dy;
    }

    // played with these numbers a little bit after class for a nicer look
    // probably more real would be slow down on way up, not on bounce...
    if(y >= theCanvas.height - RADIUS) {
      minY += minY * .25;
      dy -= dy * .001;
      dx -= dx * .001;

      if (minY >= theCanvas.height - RADIUS) {
        minY = theCanvas.height - RADIUS;
      }

      if (y > theCanvas.height - RADIUS) {
        y = theCanvas.height - RADIUS;
      } else if (y < minY) {
        y = minY;
      }
    }

    context.arc(x, y, RADIUS, 0, Math.PI * 2);
    context.fill();
  }, 1);

}());
