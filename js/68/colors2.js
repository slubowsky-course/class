(function () {
  'use strict';

  let interval;
  const startButton = document.querySelector('#start');
  const colorTable = document.querySelector('#colorTable tbody');

  function start() {
    interval = setInterval(() => {
      const color = pickRandomColor();
      const backgroundColor = pickRandomColor();;

      setColors(color, backgroundColor);

      const row = colorTable.insertRow();
      row.innerHTML = `
        <td>${new Date().toLocaleString()}</td>
        <td>${color}</td>
        <td>${backgroundColor}</td>
      `;

      row.style.color = color;
      row.style.backgroundColor = backgroundColor;

      row.addEventListener('click', () => {
        stop();
        setColors(color, backgroundColor);
      });

      // row.addEventListener('click', handleRowClick);

      /*row.addEventListener('click', () => {
        handleRowClick(color, backgroundColor);
      });*/

      /*const boundRowClickHandler = handleRowClick.bind(this, color, backgroundColor);
      row.addEventListener('click', boundRowClickHandler);*/
    }, 1000);

    startButton.innerText = 'stop';
  }

  function handleRowClick(color, backgroundColor) {
    console.log(this);
    stop();
    setColors(color, backgroundColor);
  }

  function setColors(color, backgroundColor) {
    document.body.style.color = color;
    document.body.style.backgroundColor = backgroundColor;
  }

  function stop() {
    clearInterval(interval);
    interval = null;
    startButton.innerText = 'start';
  }

  function pickRandomColor() {
    return `#${Math.floor(Math.random() * 16777216).toString(16).padStart(6, '0')}`;
  }

  startButton.addEventListener('click', e => {
    if (!interval) {
      start();
    } else {
      stop();
    }
  });
}());
