(function () {
  'use strict';

  function getElement(selector) {
    return document.querySelector(selector);
  }

  function setCss(element, property, value) {
    //console.log('in setCss', property);
    element.style[property] = value;
  }

  function addClick(element, callback) {
    element.addEventListener('click', callback);
  }

  const contactsTable = getElement('#contactsTable tbody');
  const firstInput = getElement('#first');
  const lastInput = getElement('#last');
  const emailInput = getElement('#email');
  const phoneInput = getElement('#phone');
  const addContactForm = getElement('#addContactForm');

  let contacts = [];

  addContactForm.addEventListener('submit', e => {
    e.preventDefault();

    if (!contacts.length) {
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

    addClick(button, () => {
      // row.remove();
      contactsTable.removeChild(row);
      contacts = contacts.filter(c => c !== newContact);

      if (! contacts.length) {
        contactsTable.innerHTML = `<tr>
          <td colspan="5">No contacts loaded</td>
        </tr>`;
      }
    });

    hideForm();
  });

  function hideForm() {
    addContactForm.reset();
    setCss(addContactForm, 'display', 'none');
  };

  addClick(getElement('#addContact'), () => {
    setCss(addContactForm, 'display', 'inline-block');
  });

  addClick(getElement('#cancel'), () => {
    hideForm();
  });

}());
