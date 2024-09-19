function ourFetch(url) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();

    request.onloadend = () => {
      if (request.status < 400) {
        resolve(request.responseText);
      } else {
        reject(request.status);
      }
    };

    request.onerror = e => reject(e);
    request.open('GET', url);
    request.send();
  });
}

//ourFetch('ourFetch.js', r => console.log(r), r => console.error('oops', r));

/*ourFetch('xourFetch.js')
  .then(t => console.log(t))
  .catch(e => console.error('oops', e));*/

(async function () {
  try {
    const r = await ourFetch('xourFetch.js');
    console.log(r);
  } catch(e) {
    console.error('oops', e);
  }
}());
