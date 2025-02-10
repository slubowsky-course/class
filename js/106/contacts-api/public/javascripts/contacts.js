/* global $*/

import messageBox from './messageBox.js';

const contactsTable = $('#contactsTable tbody');

let contacts = [];
const firstInput = $('#first');
const lastInput = $('#last');
const emailInput = $('#email');
const phoneInput = $('#phone');
const addContactForm = $('#addContactForm');

function showContactForm(contact) {
  if (contact) {
    firstInput.val(contact?.first);
    lastInput.val(contact?.last);
    emailInput.val(contact?.email);
    phoneInput.val(contact?.phone);
    addContactForm.data('contact', contact);
  }
  addContactForm.slideDown('fast');
}

$('#addContact').click(() => {
  //addContactForm.css('display', 'inline-block');
  //addContactForm.show();
  showContactForm();
});

function addContact(newContact) {
  if (!contacts.length) {
    contactsTable.empty();
  }

  contacts.push(newContact);

  const row = $(`
    <tr>
      <td>${newContact.first}</td>
      <td>${newContact.last}</td>
      <td>${newContact.email}</td>
      <td>${newContact.phone}</td>
      <td>
        <button class="edit">edit</button>
        <button class="delete">delete</button>
      </td>
    </tr>`)
    .appendTo(contactsTable);

  console.log(row);

  newContact.row = row;

  const editButton = row.find('.edit');
  editButton.click(async () => {
    showContactForm(newContact);
  });

  const deleteButton = row.find('.delete');
  deleteButton.click(async () => {
    try {
      const response = await fetch(`/contacts-api/${newContact.id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        const msg = await response.text();
        throw new Error(`${response.status} - ${response.statusText} ${msg}`);
      }

      //deleteContact(newContact);
    } catch (e) {
      messageBox(e.message);
    }
  });
}

function deleteContact(contact) {
  contact.row.remove();
  contacts = contacts.filter(c => c !== contact);

  if (!contacts.length) {
    contactsTable.html('<td colspan="5">no contacts loaded</td>');
  }
}

addContactForm.on('submit', async e => {
  e.preventDefault();

  const newContact = {
    first: firstInput.val(),
    last: lastInput.val(),
    email: emailInput.val(),
    phone: phoneInput.val()
  };

  const originalContact = addContactForm.data('contact');
  addContactForm.removeData('contact');
  let url = '/contacts-api';
  url = originalContact ? `${url}/${originalContact.id}` : url;
  try {
    const response = await fetch(url, {
      method: originalContact ? 'PUT' : 'POST',
      body: JSON.stringify(newContact),
      headers: {
        'content-type': 'application/json'
      }
    });

    if (!response.ok) {
      const msg = await response.text();
      throw new Error(`${response.status} - ${response.statusText} ${msg}`);
    }

    if (!originalContact) {
      const createdContact = await response.json();
      addContact(createdContact);
    } else {
      updateContact(originalContact, newContact);
    }
    hideForm();
  } catch (e) {
    messageBox(e.message);
  }
});

function updateContact(originalContact, newContact) {
  Object.assign(originalContact, newContact);
  const tds = originalContact.row.find('td');
  tds[0].textContent = newContact.first;
  tds[1].textContent = newContact.last;
  tds[2].textContent = newContact.email;
  tds[3].textContent = newContact.phone;
}

function hideForm() {
  //addContactForm[0].reset();
  addContactForm.trigger('reset');
  //addContactForm.css('display', 'none');
  //addContactForm.hide();
  addContactForm.slideUp('slow');
}

$('#cancel').click(hideForm);

async function loadContacts() {
  try {
    const r = await fetch('/contacts-api');
    if (!r.ok) {
      throw new Error(`${r.status} - ${r.statusText}`);
    }
    const loadedContacts = await r.json();

    const deletedResidents = contacts.filter(c => !loadedContacts.find(lc => lc.id === c.id));

    deletedResidents.forEach(d => deleteContact(d));

    loadedContacts.forEach(contact => {
      const existingContact = contacts.find(c => c.id === contact.id);
      if (!existingContact) {
        addContact(contact);
      } else {
        updateContact(existingContact, contact);
      }
    });
  } catch (e) {
    console.error(e);
  }
}

loadContacts();

setInterval(loadContacts, 5000);
