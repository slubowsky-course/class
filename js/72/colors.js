(function () {
  'use strict';

  const colorInput = document.querySelector('#color');
  const bgcolorInput = document.querySelector('#bgcolor');


  /*document.querySelector('#apply').addEventListener('click', () => {
    console.log('clicked', colorInput.value, bgcolorInput.value);

    //document.body.style.color = colorInput.value;
    //document.body.style.backgroundColor = bgcolorInput.value;
  });*/

  document.querySelector('#color').addEventListener('input', () => {
    document.body.style.color = colorInput.value;
  });

  document.querySelector('#bgcolor').addEventListener('change', () => {
    document.body.style.backgroundColor = bgcolorInput.value;
  });

  document.querySelector('#name').addEventListener('change', function() {
    console.log(this.value);
  });
}());
