(function () {
  'use strict';

  const theCanvas = document.querySelector('#theCanvas');
  const context = theCanvas.getContext('2d');

  context.fillStyle = 'red';
  context.fillRect(25, 25, 200, 100);

  context.strokeStyle = 'green';
  context.strokeRect(24, 24, 201, 101);

  context.beginPath();
  context.moveTo(200, 200);
  context.lineTo(225, 225);
  context.lineTo(200, 250);
  //context.lineTo(200, 200);
  context.closePath();
  context.stroke();

  context.beginPath();
  context.strokeStyle = 'purple';
  context.lineWidth = 5;
  context.moveTo(175, 200);
  context.lineTo(150, 225);
  context.lineTo(175, 250);
  //context.lineTo(200, 200);
  context.closePath();

  context.stroke();

  context.beginPath();
  context.arc(300, 300, 100, 0, Math.PI /2, true);
  context.fill();


}());
