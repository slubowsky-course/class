(function () {
  'use strict';

  const request = new XMLHttpRequest();
  console.log(`after create ready state = ${request.readyState}`);

  request.open('GET', 'xquiz.html');
  console.log(`after open ready state = ${request.readyState}`);

  request.send();
  console.log(`after send ready state = ${request.readyState}`);

  //console.log(request);
  console.log('before', request.responseText);

  /*setTimeout(() => {
    console.log(`in timeout ready state = ${request.readyState}`);

    console.log('after', request.responseText);
  }, 2000);*/

  /*request.onreadystatechange = () => {
    console.log(`in onreadystatechange ready state = ${request.readyState}`);

    if (request.readyState === 4) {
      console.log('done', request.responseText);
    }
  };*/

  request.onerror = e => {
    console.error('oops', e);
  };

  request.onloadend = () => {
    if(request.status < 400) {
      console.log('done', request.responseText);
    } else {
      console.error(`${request.status} - ${request.statusText}`);
    }
  };

  console.log('file end');
}());
