(function () {
  'use strict';

  // const box = document.querySelector('.box');
  let dragging;
  let offset;

  document.addEventListener('mousedown', e => {
    e.preventDefault();
    if (e.target.className === 'box') {
      console.log('mouse down', e);
      dragging = e.target;
      offset = { y: e.offsetY, x: e.offsetX };
    }
  });

  document.addEventListener('mousemove', e => {
    //e.preventDefault();

    if (dragging) {
      console.log('mouse move', e);

      dragging.style.top = `${e.pageY - offset.y}px`; dragging.style.left = `${e.pageX - offset.x}px`;
    }
  });

  document.addEventListener('mouseup', e => {
    console.log('mouse up', e);
    dragging = null;
  });

  const colorInput = document.querySelector('#color');
  document.querySelector('#add').addEventListener('click', () => {
    const b = document.createElement('div');
    b.className = 'box';
    b.style = `background-color: ${colorInput.value}`;
    document.body.appendChild(b);
  });
}());
