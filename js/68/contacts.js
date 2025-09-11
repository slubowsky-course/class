(function () {
  'use strict';

  const contactsTable = document.querySelector('#contactsTable tbody');
  const firstInput = document.querySelector('#first');
  const lastInput = document.querySelector('#last');
  const emailInput = document.querySelector('#email');
  const phoneInput = document.querySelector('#phone');
  const addContactForm = document.querySelector('#addContactForm');

  let contacts = [];

  addContactForm.addEventListener('submit', e => {
    e.preventDefault();

    if (! contacts.length) {
      contactsTable.deleteRow(0);
    }

    const newContact = {
      first: firstInput.value,
      last: lastInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
    };

    contacts.push(newContact);

    const row = contactsTable.insertRow();
    row.innerHTML = `<td>${newContact.first}</td>
                     <td>${newContact.last}</td>
                     <td>${newContact.email}</td>
                     <td>${newContact.phone}</td>
                     <td><button>delete</button></td>`;

    const button = row.querySelector('button');
    /*const buttonCell = document.createElement('td');
    const button = document.createElement('button');
    button.innerText = 'delete';
    buttonCell.appendChild(button);
    row.appendChild(buttonCell);*/

    button.addEventListener('click', () => {
      // row.remove();
      contactsTable.removeChild(row);
      contacts = contacts.filter(c => c !== newContact);
    });

    hideForm();
  });

  function hideForm() {
    addContactForm.reset();
    addContactForm.style.display = 'none';
  };

  document.querySelector('#addContact').addEventListener('click', () => {
    addContactForm.style.display = 'inline-block';
  });

  document.querySelector('#cancel').addEventListener('click', () => {
    hideForm();
  });

}());
