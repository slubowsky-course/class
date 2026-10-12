(function () {
  'use strict';

  console.log('file start');


  fetch('people.json')
    .then(r => {
      if (r.status < 400) {
        // return r.text();
        return r.json();
      }
      else {
        throw new Error(`${r.status} - ${r.statusText}`);
      }
    })
    .then(t => {
        console.log(t);
        // const people = JSON.parse(t);
        // console.log(people);
    })
    .catch(e => console.error('oops', e));


  console.log('file end');

}());
