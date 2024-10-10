(function () {
  'use strict';

  let dragging;
  let offset;
  let zIndex = 1;
  let parts = [];

  document.addEventListener('mousedown', e => {
    e.preventDefault();
    if (e.target.classList.contains('part')) {
      /*dragging = e.target;
      offset = { y: e.offsetY, x: e.offsetX };
      dragging.style.position = 'absolute';
      dragging.style.top = `${e.pageY - offset.y}px`;
      dragging.style.left = `${e.pageX - offset.x}px`;*/

      offset = { y: e.offsetY, x: e.offsetX };

      if (e.target.parentNode.id === 'sidebar') {
        dragging = addPart(e.target.src, e.target.className);
        parts.push(dragging);
      } else {
        dragging = e.target;
      }

      dragging.style.top = `${e.pageY - offset.y}px`;
      dragging.style.left = `${e.pageX - offset.x}px`;

      if (!dragging.classList.contains('potato')) {
        dragging.style.zIndex = zIndex++;
      }
    }
  });

  document.addEventListener('mousemove', e => {
    //e.preventDefault();

    if (dragging) {
      dragging.style.top = `${e.pageY - offset.y}px`;
      dragging.style.left = `${e.pageX - offset.x}px`;
    }
  });

  document.addEventListener('mouseup', e => {
    dragging = null;

    saveState();
  });

  function saveState() {
    const partsData = parts.map(p => {
      return  {
        src: p.src,
        className: p.className,
        top: p.style.top,
        left: p.style.left,
        zIndex: p.style.zIndex
      };
    });
    localStorage.setItem('parts', JSON.stringify(partsData));
  }

  function loadState() {
    const partsData = JSON.parse(localStorage.getItem('parts') || '[]');
    partsData.forEach(part => {
      const p = addPart(part.src, part.className);
      p.style.top = part.top;
      p.style.left = part.left;
      p.style.zIndex = part.zIndex;
      parts.push(p);
    });

  }

  function addPart(src, className) {
    const p = document.createElement('img');
    p.src = src;
    p.className = className;
    p.style.position = 'absolute';
    document.body.appendChild(p);
    return p;
  }

  loadState();
}());
