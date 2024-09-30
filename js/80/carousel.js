(function () {
  'use strict';

  const search = document.querySelector('#search');

  async function loadPictures() {
    try {
      const r = await fetch(`json\\${search.value}Result.json`);
      if (!r.ok) {
        throw new Error(`${r.status} - ${r.statusText}`);
      }
      return r.json();
    } catch (e) {
      console.error(e);
    }
  }

  search.addEventListener('change', async () => {
    const pictures = await loadPictures();
    console.log(pictures);
    pictures.items.forEach(picture => {
      const img = document.createElement('img');
      img.src = picture.media.m.replace('https://live.staticflickr.com/65535', 'images').replace('_m', '');
      document.body.appendChild(img);
    });
  });
}());
