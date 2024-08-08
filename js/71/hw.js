(function () {
  'use strict';

  //const colors = ['red', 'white', 'blue'];
  //let index = 0;
  let interval;

  const theStartButton = document.querySelector('#start');
  /*document.querySelector('#start')*/theStartButton.addEventListener('click', e => {
    if (!interval) {
      startColors();
    } else {
      stopColors();
    }
  });

  function startColors() {
    let r = 0;
    let g = 0;
    let b = 0;
    let increment = 25;

    interval = setInterval(() => {
      /*document.body.style.color = colors[index++];

      if (index === colors.length) {
        index = 0;
      }

      document.body.style.backgroundColor = colors[index];*/

      /*document.body.style.color = getRandomColor();
      document.body.style.backgroundColor = getRandomColor();*/

      //this.innerText = 'stop';
      //e.target.innerText = 'stop';


      /*for(let r = 0; r < 256; r++) {
        for(let g = 0; g < 256; g++) {
          for(let b = 0; b < 256; b++)
          {
            document.body.style.color = `rgb(${r}, ${g}, ${b})`;
            document.body.style.backgroundColor = `rgb(${b}, ${g}, ${r})`;
          }
        }
      }*/

      if ((r += increment) >= 256) {
        r = 0;
        if ((g += increment) >= 256) {
          g = 0;
          if ((b += increment) >= 256) {
            b = 0;
          }
        }
      }
      document.body.style.color = `rgb(${r}, ${g}, ${b})`;
      document.body.style.backgroundColor = `rgb(${b}, ${g}, ${r})`;

      theStartButton.innerText = 'stop';
    }, 100);
  }

  function stopColors() {
    clearInterval(interval);
    interval = null;
    //this.innerText = 'start';
    //e.target.innerText = 'start';
    theStartButton.innerText = 'start';
  }

  /*function getRandomColorPart() {
    return Math.floor(Math.random() * 256);
  }

  function getRandomColor() {
    let r = getRandomColorPart();
    let g = getRandomColorPart();
    let b = getRandomColorPart();
    return `rgb(${r}, ${g}, ${b})`;
  }*/
}());
