import './style.css';
import snakeSrc from './images/snakeHead.png';
import appleSrc from './images/apple.png';

import crashSrc from './media/crash.mp3';
import crunchSrc from './media/crunch.mp3';

import potus from './potus.json';

import 'messagebox.js/dist/themes/messagebox-default.min.css';
import MessageBox from 'messagebox.js';

console.log(typeof potus, potus);

const crashSound = document.createElement('audio');
crashSound.src = crashSrc;
const crunchSound = document.createElement('audio');
crunchSound.src = crunchSrc;

const SNAKE_SIZE = 64;

const theCanvas = document.querySelector('#theCanvas');
const context = theCanvas.getContext('2d');

function resizeCanvas() {
  theCanvas.width = (window.innerWidth - 2) - ((window.innerWidth - 2) % SNAKE_SIZE);
  theCanvas.height = (window.innerHeight - 2) - ((window.innerHeight - 2) % SNAKE_SIZE);
}

window.addEventListener('resize', resizeCanvas);

resizeCanvas();

let speed = 200;
let score = 0;
let gameOver = false;
let direction = 'ArrowRight';

class Snake {
  constructor() {
    this.x = -SNAKE_SIZE;
    this.y = 0;
  }

  move() {
    let tempX = this.x;
    let tempY = this.y;

    switch (direction) {
      case 'ArrowRight':
        tempX += SNAKE_SIZE;
        break;
      case 'ArrowLeft':
        tempX -= SNAKE_SIZE;
        break;
      case 'ArrowUp':
        tempY -= SNAKE_SIZE;
        break;
      case 'ArrowDown':
        tempY += SNAKE_SIZE;
        break;
    }

    if (tempX < 0 || tempX > theCanvas.width - SNAKE_SIZE || tempY < 0 || tempY > theCanvas.height - SNAKE_SIZE) {
      console.log('game over');
      gameOver = true;
    } else {
      this.x = tempX;
      this.y = tempY;
    }
    context.drawImage(snakeHead, this.x, this.y);
  }
}

class Apple {
  constructor() {
    this.move();
  }

  move() {
    this.x = this.getRandomNumber(theCanvas.width - SNAKE_SIZE);
    this.y = this.getRandomNumber(theCanvas.height - SNAKE_SIZE);
  }

  draw() {
    context.drawImage(appleImg, this.x, this.y);
  }

  getRandomNumber(max) {
    let n = Math.floor((Math.random() * max) + 1);
    n -= n % SNAKE_SIZE;
    return n;
  }
}

function gameLoop() {
  context.clearRect(0, 0, theCanvas.width, theCanvas.height);
  snake.move();

  if (snake.x === apple.x && snake.y === apple.y) {
    crunchSound.currentTime = 0;
    crunchSound.play();
    score++;
    speed -= speed * .05;
    console.log(speed);
    apple.move();
  }

  apple.draw();

  context.font = 'bold 32px Arial';
  context.fillStyle = 'red';

  const scoreText = `score: ${score}`;
  const tm = context.measureText(scoreText);
  //console.log(tm);

  context.fillText(scoreText, theCanvas.width - tm.width - 16, tm.actualBoundingBoxAscent + tm.actualBoundingBoxDescent + 16);

  if (!gameOver) {
    setTimeout(gameLoop, speed);
  } else {
    /*context.font = 'bold 64px Arial';
    context.fillStyle = 'blue';

    const text = 'GAME OVER!!!';
    const tm = context.measureText(text);

    context.fillText(text, (theCanvas.width / 2) - (tm.width / 2), (theCanvas.height / 2) + ((tm.actualBoundingBoxAscent + tm.actualBoundingBoxDescent) / 2));*/

    let myMessageBox = new MessageBox()
      .setTitle('Snake')
      .setMessage('Game Over!')
      .addButton("ok", "green");

    myMessageBox.show().then(response => {
      console.log('The user clicked : ' + response)
    });

    crashSound.play();
  }
}

document.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowRight':
    case 'ArrowLeft':
    case 'ArrowUp':
    case 'ArrowDown':
      direction = e.key;
  }
});

const snake = new Snake();
const snakeHead = document.createElement('img');
snakeHead.src = snakeSrc;
snakeHead.onload = () => {
  setTimeout(gameLoop, speed);
};

const apple = new Apple();
const appleImg = document.createElement('img');
appleImg.src = appleSrc;

setTimeout(gameLoop, speed);
