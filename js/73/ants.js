const theCanvas = document.querySelector('#theCanvas');

const context = theCanvas.getContext('2d');

function sizeCanvas() {
  theCanvas.width = window.innerWidth;
  theCanvas.height = window.innerHeight;
}
sizeCanvas();
window.addEventListener('resize', sizeCanvas);


class Ant {
  constructor(color) {
    this.color = color;
    this.x = window.innerWidth / 2;
    this.y = window.innerHeight / 2;
  }

  draw() {
    context.beginPath();
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, 2, 4);
    context.closePath();
    return this;
  }

  move() {
    if (!--this.brains) {
      this.brains = Ant.getRandomNumber(1, 500);
      this.dx = Ant.getRandomNumber(-1, 1);
      this.dy = Ant.getRandomNumber(-1, 1);
    }

    this.x += this.dx / 3;
    this.y += this.dy / 3;
    return this;
  }

  static getRandomNumber(min, max) {
    return Math.floor((Math.random() * (max - min + 1))) + min;
  }
}

const ants = [new Ant('black')];

for (let i = 0; i < 4000; i++) {
  ants.push(new Ant('black'));
}

function drawAnts() {
  context.clearRect(0, 0, theCanvas.width, theCanvas.height);
  ants.forEach(ant => ant.move().draw());

  requestAnimationFrame(drawAnts);
}

requestAnimationFrame(drawAnts);

const count = document.querySelector('#count');
const color = document.querySelector('#color');

document.querySelector('#addAntForm').addEventListener('submit', e => {
  e.preventDefault();

  const numAnts = +count.value;
  for (let i = 0; i < numAnts; i++) {
    ants.push(new Ant(color.value));
  }
});
