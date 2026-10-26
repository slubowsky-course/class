//handleMouseDragging(document.querySelector('.box'));

let offset;

/*function handleMouseDragging(box) {
  box.addEventListener('mousedown', e => {
    console.log('mouse down');

    // getBoundingClientRect probably better then offset
    offset = { x: e.offsetX, y: e.offsetY };

    window.addEventListener('mousemove', handleMouseMove);

    window.addEventListener('mouseup', handleMouseUp);
  });
}*/


window.addEventListener('mousedown', e => {
  if(e.target.classList.contains('box')) {
    console.log('mouse down', e);

    // getBoundingClientRect probably better then offset
    offset = { x: e.offsetX, y: e.offsetY };

    window.addEventListener('mousemove', handleMouseMove);

    window.addEventListener('mouseup', handleMouseUp);
  }
});


function handleMouseMove(e) {
  console.log('mouse move', e);

  e.target.style.top = `${e.clientY - offset.y}px`;
  e.target.style.left = `${e.clientX - offset.x}px`;
}

function handleMouseUp(e) {
  console.log('mouse up');

  window.removeEventListener('mousemove', handleMouseMove);
  window.removeEventListener('mouseup', handleMouseUp);
}

const colorInput = document.querySelector('#color');

document.querySelector('#create').addEventListener('click', () => {
  const newBox = document.createElement('div');
  newBox.className = 'box';
  newBox.style.backgroundColor = colorInput.value;
  document.body.appendChild(newBox);
  //handleMouseDragging(newBox);
});
