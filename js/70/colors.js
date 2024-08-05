(function () {
  'use strict';

  const colorInput = document.querySelector('#color');
  const bgcolorInput = document.querySelector('#bgcolor');


  /*document.querySelector('#apply').addEventListener('click', () => {
    console.log('clicked', colorInput.value, bgcolorInput.value);

    //document.body.style.color = colorInput.value;
    //document.body.style.backgroundColor = bgcolorInput.value;
  });*/

  document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();

    document.body.style.color = colorInput.value;
    document.body.style.backgroundColor = bgcolorInput.value;
  });
}());
