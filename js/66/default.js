(function () {
  'use strict';

  let acceptedLicense = false;

  document.querySelector('#theLink').addEventListener('click', e => {
    if (!acceptedLicense) {
      e.preventDefault();
    }
  });

  document.querySelector('#acceptLicense').addEventListener('click', function(e) { /*e => {*/
    acceptedLicense = true;
    //e.target.disabled = true;
    this.disabled = true;
  });
}());
