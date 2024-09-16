/*(function() {
  'use strict';

  //const p = fetch('ajax.html')
    //.then(r => console.log(r));

  ///console.log(p);

  console.log('start of file');

  async function loadAjax() {
    console.log('before fetch');

    try {
      const response = await fetch('foo.txt');
      console.log('after fetch');
      console.log(response);

      //if (response.status >= 400) {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      const text = await response.text();
      console.log(text);
    } catch(e) {
      console.error('oops', e);
    }
  }

  loadAjax();

  console.log('end of file');
}());
*/

(function() {
  'use strict';

  //const p = fetch('ajax.html')
    //.then(r => console.log(r));

  ///console.log(p);

  console.log('start of file');

  async function loadAjax() {
    console.log('before fetch');

    try {
      const response = await fetch('foo.txt');
      console.log('after fetch');
      console.log(response);

      //if (response.status >= 400) {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      const text = await response.text();
      console.log(text);
    } catch(e) {
      console.error('oops', e);
    }
  }

  loadAjax();

  console.log('end of file');
}());
