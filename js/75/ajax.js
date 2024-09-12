(function () {
  'use strict';

  const request = new XMLHttpRequest();

  /*request.onreadystatechange = () => {
    //console.log('onreadystatechange', request.readyState);
    if (request.readyState === 4) {
      if (request.status < 400) {
        console.log(request.responseText);
      } else {
        console.error('oops', request.status);
      }
    }
  };*/

  request.onloadend = () => {
    if (request.status < 400) {
      console.log(request.responseText);
    } else {
      console.error('oops', request.status);
    }
  };

  request.onerror = e => console.error('oops2', e);

  console.log('created', request.readyState);

  request.open('GET', 'ajax.js');
  console.log('opened', request.readyState);

  request.send();
  console.log('send', request.readyState);

  /*setTimeout(() => {
    console.log('after waiting', request.readyState);
    console.log(request.responseText);
  }, 2000);*/

  console.log('IIFE done');
}());
