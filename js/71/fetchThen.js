(function () {
  'use strict';

  //const request = fetch('counter1.js');
  //console.log(request);

  let status;

  fetch('xpeople.json')
    .then(response => {
      status = response.status;
      if (response.ok) {
      //if (response.status < 400) {
        // return response.text();
        return response.json();
      } else {
        //console.error('oops', `${response.status} - ${response.statusText}`);
        throw new Error(`${response.status} - ${response.statusText}`);
      }
    })
    .then(p => {
      console.log(p);
      //const people = JSON.parse(text);
      //console.log(people);

      console.log(status);
    })
    .catch(e => {
      console.error('oops', e);

      console.log(status);
    });

  console.log('file end');
}());
