(function () {
  'use strict';

  let interval;
  const colorTable = document.querySelector('#colorTable tbody');

  const theStartButton = document.querySelector('#start');
  theStartButton.addEventListener('click', () => {
    if (!interval) {
      startColors();
    } else {
      stopColors();
    }
  });

  function startColors() {
    interval = setInterval(() => {
      const color = getRandomColor();
      const bgColor = getRandomColor();
      document.body.style.color = color;
      document.body.style.backgroundColor = bgColor;
      const row = colorTable.insertRow();
      row.innerHTML = `
          <td>${new Date().toLocaleTimeString()}</td>
          <td>${color}</td>
          <td>${bgColor}</td>
      `;
      row.style.color = color;
      row.style.backgroundColor = bgColor;

      /*row.addEventListener('click', () => {
        stopColors();
        document.body.style.color = color;
        document.body.style.backgroundColor = bgColor;
      });*/

      //row.addEventListener('click', handleRowClick);
      /*const boundClickHandler = handleRowClick.bind(null, color, bgColor);
      row.addEventListener('click', boundClickHandler);*/
      row.addEventListener('click', () => {
        handleRowClick(color, bgColor);
      });

    }, 500);
    theStartButton.innerText = 'stop';
  }

  function handleRowClick(color, bgColor) {
    stopColors();
    document.body.style.color = color;
    document.body.style.backgroundColor = bgColor;
  }

  function stopColors() {
    clearInterval(interval);
    interval = null;
    theStartButton.innerText = 'start';
  }

  function getRandomColorPart() {
    return Math.floor(Math.random() * 256);
  }

  function getRandomColor() {
    let r = getRandomColorPart();
    let g = getRandomColorPart();
    let b = getRandomColorPart();
    return `rgb(${r}, ${g}, ${b})`;
  }
}());
