//(function () {
'use strict';

function getElement(selector) {
  return document.querySelector(selector);
}

function setCss(element, property, value) {
  element.style[property] = value;
}

function on(element, event, callback) {
  // browser sniffing
  /*if (navigator.userAgent.indexOf('chrome')) {
    element.addEventListener(event, callback);
  } else if(navigator.userAgent.indexOf('ie')) {
    element.X(event, callback);
  }*/

  /* feature detection
  if (element.addEventListener) {
    element.addEventListener(event, callback);
  } else if (element.X) {
    element.X(event, callback);
  }*/

  element.addEventListener(event, callback);
}

const contactsTable = getElement('#contactsTable tbody');

let contacts = [];
const firstInput = getElement('#first');
const lastInput = getElement('#last');
const emailInput = getElement('#email');
const phoneInput = getElement('#phone');
const addContactForm = getElement('#addContactForm');

on(getElement('#addContact'), 'click', () => {
  setCss(addContactForm, 'display', 'inline-block');
});

on(addContactForm, 'submit', e => {
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

  on(button, 'click', () => {
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
  setCss(addContactForm, 'display', 'none');
}

on(getElement('#cancel'), 'click', hideForm);
//}());
