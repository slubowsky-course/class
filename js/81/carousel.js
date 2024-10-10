(function () {
  'use strict';

  let pictures;

  const search = document.querySelector('#search');
  const pictureElem = document.querySelector('#picture');
  const titleElem = document.querySelector('#title');

  let index = 0;
  function updatePicture() {
    pictureElem.src = pictures[index].media.m.replace('https://live.staticflickr.com/65535', 'images').replace('_m', '');
    titleElem.innerText = pictures[index].title;
  }

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
    pictures = (await loadPictures()).items;
    updatePicture();
    /*console.log(pictures);
    pictures.items.forEach(picture => {
      const img = document.createElement('img');
      img.src = picture.media.m.replace('https://live.staticflickr.com/65535', 'images').replace('_m', '');
      document.body.appendChild(img);
    });*/

    document.querySelector('#left').addEventListener('click', () => {
      if(--index < 0) {
        index = pictures.length - 1;
      }
      updatePicture();
    });

    document.querySelector('#right').addEventListener('click', () => {
      if (++index === pictures.length) {
        index = 0;
      }
      updatePicture();
    });
  });
}());
