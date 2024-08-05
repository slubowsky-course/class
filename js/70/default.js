(function () {
  'use strict';

  let acceptedLicense = false;

  const theButton = document.querySelector('#theButton');
  /*document.querySelector('#theButton')*/ theButton.addEventListener('click', e => { // function () {
    acceptedLicense = true;
    //this.disabled = true;
    e.target.disabled = true;
    //document.querySelector('#theButton').disabled = true;
    theButton.disabled = true;
  });

  document.querySelector('#theAnchor').addEventListener('click', e => {
    if (!acceptedLicense) {
      e.preventDefault();
    }
  });
}());
