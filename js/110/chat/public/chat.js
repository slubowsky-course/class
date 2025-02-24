/* global io*/
const socketIo = io();

document.querySelector('#loginForm').addEventListener('submit', e => {
  e.preventDefault();

  socketIo.emit('login', document.querySelector('#nameInput').value, error => {
    if (error) {
      document.querySelector('#error').innerHTML = `<div>${error}</div>`;
      return;
    }

    e.target.style.display = 'none';
    document.querySelector('#messageContainer').style.display = 'block';

    const messages = document.querySelector('#messages');
    socketIo.on('msg', msg => {
      messages.innerHTML += `<div>${msg}</div>`;
    });

    socketIo.on('info', msg => {
      messages.innerHTML += `<div class="info">${msg}</div>`;
    });

    const msgInput = document.querySelector('#msgInput');
    document.querySelector('#messageForm').addEventListener('submit', e => {
      e.preventDefault();
      socketIo.emit('msg', msgInput.value);
      msgInput.value = '';
    });
  });
});
