(async function () {
  'use strict';

  function ourFetch(url) {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();

      request.open('GET', url);
      request.send();

      request.onerror = e => {
        reject(e);
      };

      request.onloadend = () => {
        if (request.status < 400) {
          resolve(request.responseText);
        } else {
          reject(new Error(`${request.status} - ${request.statusText}`));
        }
      };
    });
  }

  ourFetch('xrecipes.json')
    .then(r => console.log(r))
    .catch(e => console.error('oops1', e));

  try {
    const recipe = await ourFetch('x1.json');
    console.log(recipe);
  } catch (e) {
    console.error('oops2', e);
  }


}());
