(function () {
  'use strict';

  /*const oldOnLoad = window.onload;

  window.onload = function () {
    if (oldOnLoad) {
      oldOnLoad();
    }
    document.querySelector('#theButton').addEventListener('click', () => console.log('button was clicked #1'));
  };*/

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#theButton').addEventListener('click', () => console.log('button was clicked #1'));
  });

}());
