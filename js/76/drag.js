(function () {
  'use strict';


  let dragging = false;
  let offset;

  // addDragging(document.querySelector('.box'));

  /*function addDragging(element) {
    element.addEventListener('mousedown', e => {
      e.preventDefault();

      //console.log('begin drag', e);
      dragging = true;
      offset = { x: e.offsetX, y: e.offsetY };
    });
  }*/

  document/*.querySelector('.box')*/.addEventListener('mousedown', e => {
    if (e.target.className === 'box') {
      e.preventDefault();

      console.log('begin drag', e);
      dragging = e.target;
      offset = { x: e.offsetX, y: e.offsetY };
    }
  });

  document.addEventListener('mousemove', e => {
    //console.log(e.target);
    if (dragging) {
      //console.log('drag', e);
      dragging.style.left = `${e.pageX - offset.x}px`;
      dragging.style.top = `${e.pageY - offset.y}px`;
    }
  });

  document.addEventListener('mouseup', e => {
    //console.log('end drag', e);
    dragging = null;
  });

  const colorInput = document.querySelector('#color');
  document.querySelector('#add').addEventListener('click', () => {
    const b = document.createElement('div');
    b.className = 'box';
    b.style.backgroundColor = colorInput.value;
    document.body.appendChild(b);

    // addDragging(b);
  });
}());
