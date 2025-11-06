/* global $*/
(function () {
  'use strict';

  let dragging = false;
  let offset;
  let zIndex = 1;
  let parts = [];

  $(document).on('mousedown', '.part', e => {
    e.preventDefault();

    offset = { x: e.offsetX, y: e.offsetY };

    const target = $(e.target);

    if (target.parent().attr('id') === 'sidebar') {
      const p = addPart({
        src: target.attr('src'),
        className: target.attr('class'),
        top: `${e.pageY - offset.y}px`,
        left: `${e.pageX - offset.x}px`,
        zIndex: target.css('zIndex')
      });
      /*p.css({
        left: `${e.pageX - offset.x}px`,
        top: `${e.pageY - offset.y}px`
      });*/

      //dragging = p;
    } /*else {
      dragging = target;
    }

    if (!target.hasClass('potato')) {
      dragging.css('zIndex', zIndex++);
    }*/
  });/*.on('mousemove', e => {
    if (dragging) {
      dragging.css({
        left: `${e.pageX - offset.x}px`,
        top: `${e.pageY - offset.y}px`
      });
    }
  }).on('mouseup', e => {
    dragging = null;

    saveState();
  });*/

  function addPart(orig) {
    const p = $(`<img src="${orig.src}" class="${orig.className}" style="position: absolute; left: ${orig.left}; top: ${orig.top}; z-index: ${orig.zIndex};">`)
      .draggable({
        stop: saveState,
        stack: orig.className.includes('potato') ? '.potato' : '.part'
      });
    p.appendTo('body');
    parts.push(p);
    return p;
  }

  function saveState() {
    const partsData = parts.map(part => {
      return {
        src: part.attr('src'),
        top: part.css('top'),
        left: part.css('left'),
        className: part.attr('class'),
        zIndex: part.css('zIndex')
      };
    });

    localStorage.setItem('parts', JSON.stringify(partsData));
  }

  function loadState() {
    const partsData = JSON.parse(localStorage.getItem('parts')) || [];

    partsData.forEach(data => {
      const p = addPart(data);
      /*p.css({
        left: `${data.left}`,
        top: `${data.top}`,
        zIndex: data.zIndex
      });*/
    });

    if (partsData.length) {
      zIndex = Math.max(...partsData.map(p => p.zIndex));
    }
  }

  loadState();
}());
