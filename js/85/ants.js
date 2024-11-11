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

  class Ant {
    constructor(color) {
      this.x = window.innerWidth / 2;
      this.y = window.innerHeight / 2;
      this.color = color;
    }

    draw() {
      context.beginPath();
      context.fillStyle = this.color;
      context.fillRect(this.x, this.y, 2, 4);
      context.stroke();
    }

    move() {
      this.x += Ant.getRandomNumber(-1, 1);
      this.y += Ant.getRandomNumber(-1, 1);

      this.draw();
    }

    static getRandomNumber(min, max) {
      return Math.floor(Math.random() * ((max - min) + 1)) + min;
    }
  }

  //const ant = new Ant();
  //ant.draw();

  const ants = [];
  for(let i = 0; i < 2000; i++) {
    ants.push(new Ant(i % 2 === 0 ? 'black' : 'red'));
  }

  setInterval(() => {
    context.clearRect(0, 0, theCanvas.width, theCanvas.height);
    //ant.move();

    ants.forEach(ant => ant.move());
  }, 100);
}());
