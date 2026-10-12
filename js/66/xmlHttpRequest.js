(function () {
  'use strict';

  const request = new XMLHttpRequest();
  console.log(`created request: request.readyState = ${request.readyState}`);

  request.open('GET', 'xmlHttpRequest.html');
  console.log(`opened request: request.readyState = ${request.readyState}`);

  request.send();
  console.log(`sent request: request.readyState = ${request.readyState}`);

  /*setTimeout(() => {
    console.log(request.responseText);
    console.log(request);
    console.log(`waited for 2000: request.readyState = ${request.readyState}`);
  }, 2000);*/

  /*request.onreadystatechange = () => {
    console.log(`onreadystatechange: request.readyState = ${request.readyState}`);

    if (request.readyState === 4) {
      console.log(request.responseText);
    }
  };*/

  request.onloadend = () => {
    if (request.status < 400) {
      console.log(request.responseText);
    } else {
      console.error(`${request.status} - ${request.statusText}`);
    }
  };

  request.onerror = e => {
    console.error('oops', e);
  };

}());
