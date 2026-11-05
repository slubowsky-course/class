const theCanvas = document.querySelector('#theCanvas');

const context = theCanvas.getContext('2d');

function sizeCanvas() {
  theCanvas.width = window.innerWidth;
  theCanvas.height = window.innerHeight;
}
sizeCanvas();
window.addEventListener('resize', sizeCanvas);

class Ball {
  constructor(color, radius) {
    this.color = color;
    this.radius = radius;
    this.x = radius + 1;
    this.y = radius + 1;
    this.dx = 5;
    this.dy = 10;
    this.minY = radius + 1;
  }

  draw() {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();

    return this;
  }

  move(elapsed) {
    this.x += (this.dx * (elapsed * 0.15));
    this.y += (this.dy * (elapsed * 0.15));
    if (this.x < (this.radius + 1) || this.x >= window.innerWidth - (this.radius + 1)) {
      this.dx = -this.dx;
    }
    if (this.y < this.minY || this.y >= window.innerHeight - (this.radius + 1)) {
      this.dy = -this.dy;

      /*if (this.y >= window.innerHeight - (this.radius + 1)) {
        this.minY = this.minY + this.minY * .25;

        this.dx -= this.dx * .001;
        this.dy -= this.dy * .001;
      }*/
    }

    // this.draw();

    return this;
  }
}

const balls = [new Ball('green', 75)];

let lastTimestamp = 0;
function drawBalls(timestamp) {
  // console.log(timestamp - lastTimestamp);
  const elapsed = timestamp - lastTimestamp;
  lastTimestamp = timestamp;

  context.clearRect(0, 0, theCanvas.width, theCanvas.height);

  // ball.move();
  // ball.draw();

  // ball.move().draw();

  balls.forEach(ball => ball.move(elapsed).draw());

  requestAnimationFrame(drawBalls);
}

// setInterval(drawBalls, 16.666);
requestAnimationFrame(drawBalls);


const colorInput = document.querySelector('#color');
const radiusInput = document.querySelector('#radius');
document.querySelector('#addBallForm').addEventListener('submit', e => {
  e.preventDefault();

  balls.push(new Ball(colorInput.value, +radiusInput.value));
});
