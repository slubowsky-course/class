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

  class Ball {
    constructor(color, radius) {
      this.color = color;
      this.radius = radius;
      this.x = radius + 1;
      this.y = radius + 1;
      this.dx = 5;
      this.dy = 10.25;
      this.minY = radius + 1;
    }

    draw() {
      context.beginPath();
      context.fillStyle = this.color;
      context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      context.fill();

      return this;
    }

    move(elapsed) {
      this.x += (this.dx * (elapsed * 0.15));
      this.y += (this.dy * (elapsed * 0.15));

      if (this.x < this.radius + 1 || this.x >= theCanvas.width - (this.radius + 1)) {
        this.dx = -this.dx;
      }

      if (this.y < this.minY || this.y >= theCanvas.height - (this.radius + 1)) {
        this.dy = -this.dy;

        /*if (this.y >= theCanvas.height - (this.radius + 1)) {
          this.minY += this.minY * .25;
          this.dx -= this.dx * .001;
          this.dy -= this.dy * .001;
        }*/
      }

      //this.draw();

      return this;
    }
  }

  //const ball = new Ball('red', 50);
  const balls = [new Ball('red', 50)];

  /*setInterval(() => {
    //context.clearRect(0, 0, theCanvas.width, theCanvas.height);
    //ball.move().draw();
    //ball.move();
    //ball.draw();
    balls.forEach(b => b.move().draw());
  }, 16.666);*/

  let lastTimestamp = 0;
  function drawBalls(timestamp) {
    const elapsed = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    context.clearRect(0, 0, theCanvas.width, theCanvas.height);
    balls.forEach(b => b.move(elapsed).draw());

    requestAnimationFrame(drawBalls);
  }

  //setInterval(drawBalls, 16.66);
  requestAnimationFrame(drawBalls);

  const colorInput = document.querySelector('#color');
  const radiusInput = document.querySelector('#radius');
  document.querySelector('#add_ball').addEventListener('submit', e => {
    e.preventDefault();

    balls.push(new Ball(colorInput.value, +radiusInput.value));
  });
}());
