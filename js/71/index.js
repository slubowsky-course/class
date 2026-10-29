let offset;
let draggee = null;
let nextZIndex = 1;
const mainElem = document.querySelector('#main');
let parts;

document.querySelector('#sidebar').addEventListener('mousedown', e => {
  if (e.target.id !== 'sidebar') {
    // const part = document.createElement('img');
    // part.src = e.target.src;

    const orig = e.target;
    const part = orig.cloneNode();
    part.classList.add('part');
    /*part.style.top = `${e.clientY - e.offsetY}px`;
    part.style.left = `${e.clientX - e.offsetY}px`;*/
    mainElem.appendChild(part);

    parts.push(part);
  }
});

window.addEventListener('mousedown', e => {
  if (e.target.classList.contains('part')) {
    console.log('mouse down', e);

    e.preventDefault();

    // getBoundingClientRect probably better then offset
    offset = { x: e.offsetX, y: e.offsetY };

    window.addEventListener('mousemove', handleMouseMove);

    window.addEventListener('mouseup', handleMouseUp);

    draggee = e.target;

    if (!e.target.classList.contains('potato')) {
      draggee.style.zIndex = nextZIndex++;
    }
  }
});


function handleMouseMove(e) {
  console.log('mouse move', e);

  draggee.style.top = `${e.clientY - offset.y}px`;
  draggee.style.left = `${e.clientX - offset.x}px`;
}

function handleMouseUp(e) {
  console.log('mouse up');

  window.removeEventListener('mousemove', handleMouseMove);
  window.removeEventListener('mouseup', handleMouseUp);

  saveState();
}

function saveState() {
  localStorage.setItem('parts', JSON.stringify(parts.map(part => {
    return {
      src: part.src,
      top: part.style.top,
      left: part.style.left,
      class: part.className,
      zIndex: part.style.zIndex
    };
  })));
}


function createPart(partData) {
  const p = document.createElement('img');
  p.src = partData.src;
  p.style.top = partData.top;
  p.style.left = partData.left;
  p.className = partData.class;
  p.style.zIndex = partData.zIndex;
  //mainElem.appendChild(p);
  return p;
}

function loadStorage() {
  const loadedParts = JSON.parse(localStorage.getItem('parts')) ?? [];
  parts = loadedParts.map(part => createPart(part));
  parts.forEach(p => mainElem.appendChild(p));
}

loadStorage();
