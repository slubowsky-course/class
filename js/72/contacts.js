(function () {
  'use strict';

  const contactsTable = document.querySelector('#contactsTable tbody');

  let contacts = [];
  const firstInput = document.querySelector('#first');
  const lastInput = document.querySelector('#last');
  const emailInput = document.querySelector('#email');
  const phoneInput = document.querySelector('#phone');
  const addContactForm = document.querySelector('#addContactForm');

  document.querySelector('#addContact').addEventListener('click', () => {
    addContactForm.style.display = 'inline-block';
  });

  addContactForm.addEventListener('submit', e => {
    e.preventDefault();

    if (!contacts.length) {
      contactsTable.deleteRow(0);
    }

    const newContact = {
      first: firstInput.value,
      last: lastInput.value,
      email: emailInput.value,
      phone: phoneInput.value
    };

    contacts.push(newContact);

    const row = contactsTable.insertRow();
    row.innerHTML = `
      <td>${newContact.first}</td>
      <td>${newContact.last}</td>
      <td>${newContact.email}</td>
      <td>${newContact.phone}</td>
      <td><button>delete</button></td>`;

    const button = row.querySelector('button');

    /*const deleteCell = row.insertCell();
    const button = document.createElement('button');
    button.innerText = 'delete';
    deleteCell.appendChild(button);*/

    button.addEventListener('click', ()=> {
      row.remove();
      contacts = contacts.filter(c => c !== newContact);

      if (!contacts.length) {
        contactsTable.innerHTML = '<td colspan="5">no contacts loaded</td>';
      }
    });

    hideForm();
  });

  function hideForm() {
    addContactForm.reset();
    addContactForm.style.display = 'none';
  }

  document.querySelector('#cancel').addEventListener('click', hideForm);
}());
