import './style.css';
import snakeSrc from './images/snakeHead.png';
import appleSrc from './images/apple.png';

// after class commented out audio elements in html, creating and setting src here - from modules
import crashSoundSrc from './media/crash.mp3';
import crunchSoundSrc from './media/crunch.mp3';
const crash = document.createElement('audio');
crash.src = crashSoundSrc;
const crunch = document.createElement('audio');
crunch.src = crunchSoundSrc;

const theCanvas = document.querySelector('#theCanvas');

const context = theCanvas.getContext('2d');

const SNAKE_SIZE = 64;

function sizeCanvas() {
  theCanvas.width = window.innerWidth - (window.innerWidth % SNAKE_SIZE);
  theCanvas.height = window.innerHeight - (window.innerHeight % SNAKE_SIZE);
}
sizeCanvas();
window.addEventListener('resize', sizeCanvas);

// let x = -SNAKE_SIZE;
// let y = 0;
let direction = 'ArrowRight';
let score = 0;
// const crash = document.querySelector('#crash');
// const crunch = document.querySelector('#crunch');
let speed = 500;
let gameOver = false;

class Snake {
  segments = [{
    x: -SNAKE_SIZE,
    y: 0
  }];

  get head() {
    return this.segments[0];
  }

  grow() {
    this.segments.push({
      x: this.segments.at(-1).x,
      y: this.segments.at(-1).y
    });
  }

  move() {
    let tempX = this.head.x;
    let tempY = this.head.y;

    switch (direction) {
      case 'ArrowUp':
        tempY -= SNAKE_SIZE;
        break;
      case 'ArrowDown':
        tempY += SNAKE_SIZE;
        break;
      case 'ArrowLeft':
        tempX -= SNAKE_SIZE;
        break;
      case 'ArrowRight':
        tempX += SNAKE_SIZE;
        break;
    }

    for (let i = 3; i < this.segments.length - 1; i++) {
      if (this.segments[i].x === tempX && this.segments[i].y === tempY) {
        gameOver = true;
        crash.play();
        break;
      }
    }

    if (!gameOver) {
      if (tempX < 0 || tempX > theCanvas.width - SNAKE_SIZE ||
        tempY < 0 || tempY > theCanvas.height - SNAKE_SIZE) {
        gameOver = true;

        crash.play();
      } else {
        const oldTail = this.segments.pop();
        oldTail.x = tempX;
        oldTail.y = tempY;
        this.segments.unshift(oldTail);
      }
    }

    this.draw();
  }

  draw() {
    context.drawImage(snakeHead, this.head.x, this.head.y);

    for (let i = 1; i < this.segments.length; i++) {
      context.fillStyle = 'green';
      context.beginPath();
      context.fillRect(this.segments[i].x, this.segments[i].y, SNAKE_SIZE, SNAKE_SIZE);
    }
  }
}

class Apple {
  constructor() {
    this.move();
  }

  draw() {
    context.drawImage(appleImg, this.x, this.y);
  }

  move() {
    let valid = false;
    while (!valid) {
      const x = Apple.getRandomNumber(theCanvas.width);
      this.x = x - (x % SNAKE_SIZE);
      const y = Apple.getRandomNumber(theCanvas.height);
      this.y = y - (y % SNAKE_SIZE);

      console.log(x, y);

      if (!snake.segments.some(s => s.x === this.x && s.y === this.y)) {
        valid = true;
      }
    }

    console.log('got apple spot');
  }

  static getRandomNumber(max) {
    return Math.floor(Math.random() * (max + 1));
  }
}

function gameLoop() {
  if (!gameOver) {
    context.clearRect(0, 0, theCanvas.width, theCanvas.height);

    snake.move();
    apple.draw();

    if (snake.head.x === apple.x && snake.head.y === apple.y) {
      score++;
      speed *= .95;
      crunch.currentTime = 0;
      crunch.play();

      snake.grow();

      apple.move();
    }

    context.fillStyle = 'green';
    context.font = '32px Cursive';
    const scoreText = `Score: ${score}`;
    const metrics = context.measureText(scoreText);
    context.fillText(scoreText, (theCanvas.width - metrics.width) - 10, 36);

    setTimeout(gameLoop, speed);
  }
}

const snake = new Snake();
const apple = new Apple();

const snakeHead = document.createElement('img');
// snakeHead.src = 'images/snakeHead.png';
snakeHead.src = snakeSrc;
snakeHead.onload = () => {
  setTimeout(gameLoop, speed);
};

const appleImg = document.createElement('img');
// appleImg.src = 'images/apple.png';
appleImg.src = appleSrc;

const opposites = {
  ArrowUp: 'ArrowDown',
  ArrowDown: 'ArrowUp',
  ArrowLeft: 'ArrowRight',
  ArrowRight: 'ArrowLeft'
};

window.addEventListener('keydown', e => {
  const isOnPiece = snake.segments.length === 1;

  switch (e.key) {
    case 'ArrowUp':
    case 'ArrowDown':
    case 'ArrowLeft':
    case 'ArrowRight':
      if (isOnPiece || e.key !== opposites[direction])
        direction = e.key;
      break;
    default:
      console.log(`${e.key} not processed`);
  }
  /*switch (e.key) {
    case 'ArrowUp':
      if (isOnPiece || ! direction === 'ArrowDown') {
        direction = e.key;
      }
      break;
    case 'ArrowDown':
      if (isOnPiece || !direction === 'ArrowUp') {
        direction = e.key;
      }
      break;
    case 'ArrowLeft':
      if (isOnPiece || !direction === 'ArrowRight') {
        direction = e.key;
      }
      break;
    case 'ArrowRight':
      if (isOnPiece || !direction === 'ArrowRight') {
        direction = e.key;
      }
      break;
    default:
      console.log(`${e.key} not processed`);
  }*/
});
