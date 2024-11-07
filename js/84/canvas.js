(function () {
  const canvas = document.querySelector('#theCanvas');
  const context = canvas.getContext('2d');

  context.strokeRect(25, 25, 50, 50);

  context.fillStyle = 'red';
  context.fillRect(75, 75, 50, 50);
  context.strokeRect(74, 74, 52, 52);

  context.strokeRect(125, 125, 100, 50);

  context.beginPath();
  context.moveTo(200, 200);
  context.lineTo(225, 225);
  context.lineTo(200, 250);
  //context.lineTo(200, 200);
  context.closePath();
  context.stroke();

  context.beginPath();
  context.strokeStyle = 'blue';
  context.moveTo(175, 200);
  context.lineTo(150, 225);
  context.lineTo(175, 250);
  //context.lineTo(175, 200);
  context.closePath();

  context.stroke();

  context.beginPath();
  context.strokeStyle.width = 5;
  //context.arc(400, 400, 100, 0, Math.PI / 4, false);
  context.arc(400, 400, 100, 0, Math.PI * 2);
  //context.stroke();
  context.fill();

  //const img = document.querySelector('img');

  const img = document.createElement('img');
  img.src = '15.png';

  // context.drawImage(img, 200,300);
  /*setTimeout(() => {
    context.drawImage(img, 200,300);
  }, 1000);*/

  img.onload = () => {
    console.log('image loaded');
    context.drawImage(img, 200, 300, 97*3, 71*3);
  };

  img.onerror = () => {
    console.log('image NOT loaded');
  };
}());
