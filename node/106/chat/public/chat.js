const socketIo = io();

document.querySelector('#login').addEventListener('submit', e => {
  e.preventDefault();

  socketIo.emit('login', document.querySelector('#name').value, error => {
    if (error) {
      document.querySelector('#error').innerText = error;
      return console.error(error);
    }

    e.target.style = 'display: none';
    document.querySelector('#messagesContainer').style = 'display: block';

    const messages = document.querySelector('#messages');
    socketIo.on('msg', msg => {
      messages.innerHTML += `<div>${msg}</div>`;
    });

    socketIo.on('info', msg => {
      messages.innerHTML += `<div class="info">${msg}</div>`;
    });

    const messageInput = document.querySelector('#messageInput');

    document.querySelector('#messageForm').addEventListener('submit', e => {
      e.preventDefault();
      socketIo.emit('msg', messageInput.value);
    });
  });
});
