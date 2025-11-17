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
  let x = RADIUS + 1;
  let y = RADIUS + 1;
  let dx = 1;
  let dy = 2.5; // changed this from 1 after class

  setInterval(() => {
    //context.clearRect(x - (RADIUS + 1), y - (RADIUS + 1), (RADIUS * 2) + 2, (RADIUS * 2) + 2);
    context.clearRect(0,0, theCanvas.width, theCanvas.height);

    context.beginPath();
    context.fillStyle = 'blue';

    x += dx;
    y += dy;

    // removed useless 0 + after class
    if (x < RADIUS + 1 || x >= theCanvas.width - (RADIUS+1)) {
      dx = -dx;
    }

    if (y < RADIUS + 1 || y >= theCanvas.height - (RADIUS + 1)) {
      dy = -dy;
    }

    context.arc(x, y, RADIUS, 0, 2 * Math.PI);
    context.fill();
  }, 1);

  //const img = document.querySelector('img');
  //context.drawImage(img, 50, 50);

  const img = document.createElement('img');
  img.src = '23.png';

  /*setTimeout(() => {
    context.drawImage(img, 50, 50);
  }, 2000);*/

  img.onload = () => {
    context.drawImage(img, 50, 50);
  };

  img.onerror = () => {
    console.error('no potato for you');
  };

}());
