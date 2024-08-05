(function () {
  'use strict';

  let numButtons = 1;

  const theDiv = document.querySelector('#theDiv');

  const clickHandler = /*e => {*/ function clickHandler(e) {
    console.dir(this, e.target);
    e.stopPropagation();

    if (e.target.tagName !== 'BUTTON') {
      return;
    }

    // make ajax call
    console.log(`get data for ${e.target.innerText}`);

    switch(e.target.innerText) {
      case '1':
        console.log('Do one stuff');
        break;
      case '2':
        console.log('Do 2 stuff');
        break;
      case '3':
        console.log('Do three stuff');
        break;

    }

    const newButton = document.createElement('button');
    newButton.innerText = ++numButtons;
    //newButton.addEventListener('click', clickHandler);
    /*document.body*/theDiv.appendChild(newButton);
  };

  document.querySelector('#one').addEventListener('click', clickHandler);
  theDiv.addEventListener('click', clickHandler);

  setTimeout(() => {
    document.querySelector('#one').removeEventListener('click', clickHandler);
  }, 10000);
}());
