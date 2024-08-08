(function () {
  'use strict';

  const contactsTable = document.querySelector('#contactsTable tbody');

  const contacts = [];
  const firstInput = document.querySelector('#first');
  const lastInput = document.querySelector('#last');
  const emailInput = document.querySelector('#email');
  const phoneInput = document.querySelector('#phone');
  const addContactForm = document.querySelector('#addContactForm');

  document.querySelector('#addContact').addEventListener('click', () => {
    addContactForm.style.display = 'inline-block';
  });


  /*document.querySelector('#addContactForm')*/addContactForm.addEventListener('submit', e => {
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

    /*contactsTable.innerHTML += '<tr><td>Joe</td><td>Biden</td><td>jbiden@whitehouse.gov</td><td>123456789</td></tr>';*/

    const row = contactsTable.insertRow();
    row.innerHTML = `
      <td>${newContact.first}</td>
      <td>${newContact.last}</td>
      <td>${newContact.email}</td>
      <td>${newContact.phone}</td>`;

    /*firstInput.value = '';
    lastInput.value = '';
    phoneInput.value = '';
    emailInput.value = '';*/

    //this.reset();
    //e.target.reset();
    addContactForm.reset();
    addContactForm.style.display = 'none';

    /*const firstCell = row.insertCell();
    firstCell.innerHTML = 'Joe';
    const lastCell = row.insertCell();
    lastCell.innerHTML = 'Biden';
    const emailCell = row.insertCell();
    emailCell.innerHTML = 'jbiden@whitehouse.gov';
    const phoneCell = row.insertCell();
    phoneCell.innerHTML = '123456789';*/

    //const row = document.createElement('tr');
    /*row.innerHTML = '<td>Joe</td><td>Biden</td><td>jbiden@whitehouse.gov</td><td>123456789</td>';*/
    /*const firstCell = document.createElement('td');    firstCell.innerHTML = 'Joe';
    row.appendChild(firstCell);
    contactsTable.appendChild(row);*/


  });
}());
