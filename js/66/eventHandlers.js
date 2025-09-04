(function () {
  'use strict';

  let clicks = 0;

  const theButton = document.querySelector('#theButton');

  theButton.addEventListener('click', /*function*/ e => {
    e.stopPropagation();
    // theButton.textContent = ++clicks;
    // this.textContent = ++clicks;
    //console.log(e);

    e.target.textContent = ++clicks;
  });


  document.querySelector('#theDiv').addEventListener('click', e => {
    /*switch(e.target.id) {
      case 'theButton':
        console.log('theButton was clicked');
        break;
      case 'another':
        console.log('another was clicked');
        break;
      default:
        console.log('Unknown elem was clicked');
    }*/

    if (e.target.id === 'theDiv')
      return;

    console.log('call api and load order #', e.target.id);
  });
}());
