(function () {
  'use strict';

  console.log('first line');

  let status;

  fetch('things.json')
    .then(r => {
      if (r.status < 400) {
        //return r.text();
        return r.json();
      } else {
        //console.error('oops2', `${r.status} - ${r.statusText}`);
        status = r.status;
        console.log(r);
        throw new Error(`${r.status} - ${r.statusText}`);
      }
    })
    .then(things => {
      console.log(things);
      //const things = JSON.parse(t);
      things.forEach(thing => {
        console.log(thing.name, thing.price, thing);
      });
    })
    .catch(e => {
      console.log('doing 10 lines of sophisticated error handling here');
      console.error('oops', e);
      console.log(status);
    });

  console.log('last line');
}());
