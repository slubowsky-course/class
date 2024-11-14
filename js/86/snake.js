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

  let direction = 'ArrowRight';

  let x = -SNAKE_SIZE;
  let y = 0;
  const snakeHead = document.createElement('img');
  snakeHead.src = 'images/snakeHead.png';
  snakeHead.onload = () => {
    setInterval(() => {
      console.log(direction);
      context.clearRect(0, 0, theCanvas.width, theCanvas.height);

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
    switch(e.key) {
      case 'ArrowRight':
      case 'ArrowLeft':
      case 'ArrowUp':
      case 'ArrowDown':
        direction = e.key;
    }
  });
}());
