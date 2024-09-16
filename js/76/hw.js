/* global pcsMessageBox, $*/

/*(function () {
  'use strict';

  const fileName = document.querySelector('#fileName');
  const result = document.querySelector('#result');
  // const result2 = document.querySelector('#result2');
  const spinner = document.querySelector('#spinner');

  document.querySelector('#load').addEventListener('click', () => {

    console.log('before fetch');

    spinner.style.display = 'inline-block';
    result.innerText = '';

    const p = fetch(fileName.value)
      .then(r => {
        if (r.status >= 400) {
          throw new Error(`${r.status} - ${r.statusText}`);
        }

        return r.text();
      })
      .then(t => {
        result.innerText = t;
        // result2.innerHTML = t;

        //spinner.style.display = 'none';
      })
      .catch(e => {
        // console.error('oops', e);

        //spinner.style.display = 'none';

        //result.innerHTML = `<span class="error">${e.message}</span>`;

        pcsMessageBox(e.message);
      })
      .finally(() => spinner.style.display = 'none');

    console.log(p);

    console.log('after fetch');
  });
}());*/

(function () {
  'use strict';

  const fileName = $('#fileName');
  const result = $('#result');
  const spinner = $('#spinner');

  $('#load').click(async () => {

    spinner.show();
    result.empty();

    try {
      const r = await fetch(fileName.val());

      if (!r.ok) {
        throw new Error(`${r.status} - ${r.statusText}`);
      }

      const t = await r.text();

      result.text(t);
    } catch (e) {
      pcsMessageBox(e.message);
    } finally {
      spinner.hide();
    }
  });
}());
