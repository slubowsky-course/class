/*export default function (selector = 'body') {
  const clockElem = document.createElement('div');
  document.querySelector(selector).appendChild(clockElem);

  clockElem.classList.add('clock');

  /*clockElem.style.color = 'red';
  clockElem.style.backgroundColor = 'black';
  clockElem.style.display = 'inline-block';
  clockElem.style.padding = '1em';
  clockElem.style.fontSize = '2em';
  clockElem.style.fontWeight = 'bold';
  clockElem.style.fontFamily = 'monospace';* /

  function tick() {
    clockElem.innerText = new Date().toLocaleTimeString();
  }

  setInterval(tick, 1000);
  tick();
}*/

/*global $*/
export default function (selector = 'body') {
  const clockElem = $('<div></div>');
  $(selector).append(clockElem);

  clockElem.addClass('clock');

  clockElem.css('color', 'red');
  /*clockElem.style.backgroundColor = 'black';
  clockElem.style.display = 'inline-block';
  clockElem.style.padding = '1em';
  clockElem.style.fontSize = '2em';
  clockElem.style.fontWeight = 'bold';
  clockElem.style.fontFamily = 'monospace';*/

  function tick() {
    clockElem.text(new Date().toLocaleTimeString());
  }

  setInterval(tick, 1000);
  tick();
}
