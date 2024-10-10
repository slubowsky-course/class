/* global $*/
(function () {
  'use strict';

  //let dragging;
  //let offset;
  //let zIndex = 1;
  let parts = [];

  $(document).on('mousedown', '.part', e => {
    e.preventDefault();

    const offset = { y: e.offsetY, x: e.offsetX };

    const target = $(e.target);

    let dragging = target;

    if (target.parent().attr('id') === 'sidebar') {
      dragging = addPart(target.attr('src'), target.attr('class'));
      parts.push(dragging);
    }/* else {
      dragging = target;
    }*/

    dragging.css({
      top: `${e.pageY - offset.y}px`,
      left: `${e.pageX - offset.x}px`
    });

    /*if (!dragging.hasClass('potato')) {
      dragging.css('zIndex',  zIndex++);
    }*/
  });

  /*$(document).on('mousemove', e => {
    //e.preventDefault();

    if (dragging) {
      dragging.css({
        top: `${e.pageY - offset.y}px`,
        left: `${e.pageX - offset.x}px`
      });
    }
  });

  $(document).on('mouseup', e => {
    dragging = null;

    saveState();
  });*/

  function saveState() {
    const partsData = parts.map(p => {
      return  {
        src: p.attr('src'),
        className: p.attr('class'),
        top: p.css('top'),
        left: p.css('left'),
        zIndex: p.css('zIndex')
      };
    });
    localStorage.setItem('parts', JSON.stringify(partsData));
  }

  function loadState() {
    const partsData = JSON.parse(localStorage.getItem('parts') || '[]');
    partsData.forEach(part => {
      const p = addPart(part.src, part.className);
      p.css({
        top: part.top,
        left: part.left,
        zIndex: part.zIndex
      });
      parts.push(p);
    });
  }

  function addPart(src, className) {
    return $(`<img src="${src}" class="${className}" style="position: absolute;">`)
      .appendTo('body')
      .draggable({
        stop: saveState,
        stack: !className.includes('potato') ? '.part' : ''
      });
  }

  loadState();
}());
