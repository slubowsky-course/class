(function () {
  'use strict';


  const color = document.querySelector('#color');
  const bgcolor = document.querySelector('#bgcolor');

  //document.querySelector('button').addEventListener('click', e => {
  document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();

    document.body.style.color = color.value;
    document.body.style.backgroundColor = bgcolor.value;
  });
}());
