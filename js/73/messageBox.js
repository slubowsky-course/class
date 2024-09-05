window.pcsMessageBox = (function () {
  'use strict';

  const width = 240;
  const height = 180;
  let offsetLeft = -(width / 2);
  let offsetTop = -(height / 2);

  let nextIndex = 1;

  const modalDiv = document.createElement('div');
  modalDiv.style.position = 'absolute';
  modalDiv.style.top = 0;
  modalDiv.style.left = 0;
  modalDiv.style.height = '100%';
  modalDiv.style.width = '100%';
  modalDiv.style.backgroundColor = 'lightgray';
  modalDiv.style.opacity = '.5';
  modalDiv.style.display = 'none';
  document.body.appendChild(modalDiv);

  return function (msg, buttons /*= ['ok']*/, callback, modal = false) {
    buttons = buttons || ['ok'];
    //console.log(msg);

    const div = document.createElement('div');
    div.style.boxSizing = 'border-box';
    div.style.backgroundColor = 'lightcyan';
    div.style.border = '1px solid black';
    div.style.padding = '1em';
    div.style.width = `${width}px`;
    div.style.height = `${height}px`;
    div.style.position = 'absolute';
    div.style.top = '50%';
    div.style.left = '50%';
    div.style.marginTop = `${offsetTop}px`;
    div.style.marginLeft = `${offsetLeft}px`;

    const msgDiv = document.createElement('div');
    msgDiv.innerText = msg;
    msgDiv.style.overflow = 'auto';
    msgDiv.style.height = '7em';

    const buttonDiv = document.createElement('div');

    if (buttons) {
      //buttons.forEach(b => {
      for(let i = 0; i < buttons.length; i++) {
        const button = document.createElement('button');
        button.innerText = buttons[i];//b;
        button.addEventListener('click', () => {
          div.remove();
          modalDiv.style.display = 'none';
          if (callback) {
            callback(i);//buttons[i]);//b);
          }
        });
        buttonDiv.appendChild(button);
      }//);
    }

    buttonDiv.style.position = 'absolute';
    buttonDiv.style.width = '100%';
    buttonDiv.style.bottom = '1em';
    buttonDiv.style.textAlign = 'center';
    buttonDiv.style.left = 0;

    div.appendChild(msgDiv);
    div.appendChild(buttonDiv);
    document.body.appendChild(div);

    offsetTop += 20;
    offsetLeft += 20;

    if (height + offsetTop + (window.innerHeight / 2) > window.innerHeight) {
      offsetTop -= window.innerHeight - height;
    }
    if (width + offsetLeft + (window.innerWidth / 2) > window.innerWidth) {
      offsetLeft -= window.innerWidth - width;
    }

    if (modal) {
      modalDiv.style.zIndex = nextIndex++;
      div.style.zIndex = nextIndex++;
      modalDiv.style.display = 'block';
    }

    div.addEventListener('click', () => {
      div.style.zIndex = nextIndex++;
    });
  };
}());
