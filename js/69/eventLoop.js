(function () {
  'use strict';

  const theButton = document.querySelector('#theButton');
  /*theButton.style.backgroundColor = 'blue';
  theButton.style.color = 'red';
  theButton.style.padding = '1em';
  theButton.style.fontSize = '2em';*/
  theButton.style.top = 0;

  theButton.className = 'button';

  /*const theButtons = document.querySelectorAll('button');
  theButtons.forEach(b => b.style.fontFamily = 'cursive');*/
  console.log('===>', getComputedStyle(theButton).top);

  /*for(let i = 0; i < 1000; i++) {
    let top = parseInt(theButton.style.top);
    theButton.style.top = `${top+1}px`;
  }*/

  function moveTheButton() {
    let top = parseInt(theButton.style.top);
    theButton.style.top = `${top + 1}px`;

    //setTimeout(moveTheButton, 500);
  }

  //setTimeout(moveTheButton, 500);
  //setInterval(moveTheButton, 100);

  //moveTheButton();

  let interval;
  const moveItButton = document.querySelector('#moveIt');
  moveItButton.addEventListener('click', e => {
    e.stopPropagation();

    //console.log(this);
    console.log(e);
    if (!interval) {
      interval = setInterval(moveTheButton, 100);
      console.log(`started interval ${interval}`);
      //this.innerText = 'Stop';
      //moveItButton.innerText = 'Stop';
      e.target.innerText = 'Stop';
    } else {
      clearInterval(interval);
      interval = null;
      //this.innerText = 'Start';
      //moveItButton.innerText = 'Start';
      e.target.innerText = 'Start';
    }
    /*setTimeout(() => {
      console.log(`stopping interval ${interval}`);
      clearInterval(interval);
    }, 3000);*/
  });

  console.log('===>', getComputedStyle(theButton).top);


  document.querySelector('#theDiv').addEventListener('click', e => {
    console.log('the div was clicked', e.target.innerText);
  });
}());

console.log('done');

let x = 0;
function foo() {
  x += 500;
  console.log(x);
}

foo();
foo();
