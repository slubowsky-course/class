/* global pcsMessageBox, $*/

/*(function () {
  'use strict';

  const urlInput = document.querySelector('#url');
  const resultsElem = document.querySelector('#results');
  const loadingImg = document.querySelector('#loading');

  document.querySelector('#load').addEventListener('submit', async e => {
    e.preventDefault();

    loadingImg.style.display = 'inline-block';
    resultsElem.innerText = '';

    /*fetch(urlInput.value)
      .then(r => {
        if (!r.ok) {
          throw new Error(`${r.status} - ${r.statusText}`);
        }
        return r.text();
      })
      .then(t => resultsElem.innerText = t)
      .catch(e => {
        pcsMessageBox({msg: e.message});
      })
      .finally(() => loadingImg.style.display = 'none');* /

      try {
        const r = await fetch(urlInput.value);
        if (!r.ok) {
          throw new Error(`${r.status} - ${r.statusText}`);
        }
        const t = await r.text();
        resultsElem.innerText = t;
      } catch(e) {
        pcsMessageBox({ msg: e.message, modal: true });
      } finally {
        loadingImg.style.display = 'none';
      }
  });


}());*/


(function () {
  'use strict';

  const urlInput = $('#url');
  const resultsElem = $('#results');
  const loadingImg = $('#loading');

  document.querySelector('#load').addEventListener('submit', async e => {
    e.preventDefault();

    loadingImg.show();
    resultsElem.text('');

    try {
      const r = await fetch(urlInput.val());
      if (!r.ok) {
        throw new Error(`${r.status} - ${r.statusText}`);
      }
      const t = await r.text();
      resultsElem.text(t);
    } catch (e) {
      pcsMessageBox({ msg: e.message, modal: true });
    } finally {
      loadingImg.hide();
    }
  });


  $('h1').css('color', 'red')
    .click(e => console.log('h1 was clicked'));

  /*$('body')
    .click(() => console.log('body was clicked'));*/

  $('body').on('click', 'h1', () => console.log('body was clicked'));


  document.querySelector('body').addEventListener('click', e => {
    if (e.target.nodeName === 'H1') {
      console.log('body was clicked 2', e);
    }
  });

  $('body').append('<h1>new one</h1>');



}());
