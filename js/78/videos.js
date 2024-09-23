/* globals $*/
(async function () {
  'use strict';

  const videoList = $('#sidebar ul');
  const videoElem = $('video');

  async function loadVideos() {
    try {
      const r = await fetch('videos.json');
      if (!r.ok) {
        throw new Error(`${r.status} - ${r.statusText}`);
      }
      return r.json();
    } catch (e) {
      console.error(e);
    }
  }

  let activeVideo;

  async function displayVideos() {
    const videos = await loadVideos();
    videos.forEach(v => {
      const li = $(`<li>
          <span>${v.name}</span>
          <img src="${v.picture || 'media/video.png'}"/>
        </li>`).appendTo(videoList)
        .click(() => {
          videoElem.attr('src', v.url);
          //videoElem[0].play();
          //videoElem.trigger('play');

          activeVideo?.css('border-color', 'black');

          li.css({
            color: 'gray',
            borderColor: 'red'
          });

          activeVideo = li;
        });

    });
  }

  displayVideos();
}());
