(function () {
  'use strict';

  const SNAKE_SIZE = 64;

  const theCanvas = document.querySelector('#theCanvas');
  const context = theCanvas.getContext('2d');

  function resizeCanvas() {
    theCanvas.width = window.innerWidth - (window.innerWidth % SNAKE_SIZE);
    theCanvas.height = window.innerHeight - (window.innerHeight % SNAKE_SIZE);
  }

  window.addEventListener('resize', resizeCanvas);

  resizeCanvas();

  let x = 0;
  let y = 0;
  let direction = 'ArrowRight';

  const snakeHead = document.createElement('img');
  snakeHead.src = 'snakeHead.png';
  snakeHead.onload = () => {
    setInterval(() => {
      context.clearRect(0, 0, theCanvas.width, theCanvas.height);

      context.font = '30px Arial';
      context.fillText("Score: 500", 250, 250);

      switch(direction) {
        case 'ArrowRight':
          x += SNAKE_SIZE;
          break;
        case 'ArrowLeft':
          x -= SNAKE_SIZE;
          break;
        case 'ArrowUp':
          y -= SNAKE_SIZE;
          break;
        case 'ArrowDown':
          y += SNAKE_SIZE;
          break;
      }
      context.drawImage(snakeHead, x, y);
    }, 500);
  };

  document.addEventListener('keydown', e => {
    console.log(e);
    switch(e.key) {
      case 'ArrowRight':
      case 'ArrowLeft':
      case 'ArrowUp':
      case 'ArrowDown':
        direction = e.key;
        break;
      default:
        console.log(e.key, 'is not a supported key');
    }
  });
}());
