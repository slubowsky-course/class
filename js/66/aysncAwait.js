//(async function () {
  //'use strict';

  console.log('file start');

  //async function doIt() {
    try {
      const r = await fetch('people.json');
      //if (r.status >= 400) {
      if (!r.ok) {
        throw new Error(`${r.status} - ${r.statusText}`);
      }
      //const t = await r.text();
      const t = await r.json();
      console.log(t);
    } catch(e) {
      console.error('oops', e);
    }

      /*if (r.status < 400) {
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
    .catch(e => console.error('oops', e));*/
  //}

  //doIt();

  console.log('file end');

//}());
