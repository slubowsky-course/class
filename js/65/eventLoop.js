(function () {
  'use strict';

  const theButton = document.querySelector('#theButton');

  theButton.style.backgroundColor = 'red';
  theButton.style.color = 'black';
  theButton.style.padding = '1em';
  theButton.style.fontWeight = 'bold';
  theButton.style.fontSize = '2em';

  theButton.className += ' foo button';

  console.log(getComputedStyle(theButton));

  /*for(let i = 0; i < 100; i++) {
    //theButton.style.top++;
    let top = parseInt(getComputedStyle(theButton).top) + 1;
    theButton.style.top = `${top}px`;
  }*/

  function moveIt() {
    let top = parseInt(getComputedStyle(theButton).top) + 10;
    theButton.style.top = `${top}px`;

    //setTimeout(moveIt, 1000);
  }

  // moveIt();

  //setTimeout(moveIt, 1000);
  //setInterval(moveIt, 1000);

  const moveButton = document.querySelector('#move');

  let theInterval;

  moveButton.addEventListener('click', () => {
    if (!theInterval) {
      theInterval = setInterval(moveIt, 500);
      console.log(theInterval);

      moveButton.textContent = 'stop';
    } else {
      clearInterval(theInterval);
      theInterval = null;

      moveButton.textContent = 'start';
    }

    /*setTimeout(() => {
      clearInterval(theInterval);
    }, 5000);*/
  });



/*
  const foos = document.querySelectorAll('.foo');

  foos.forEach(f => f.style.fontFamily = 'cursive');
*/
}());
