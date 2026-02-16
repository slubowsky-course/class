/* global $, pcsMessageBox */

import messageBox from './messageBox.js'

const contactsTable = $('#contactsTable tbody');
const firstInput = $('#first');
const lastInput = $('#last');
const emailInput = $('#email');
const phoneInput = $('#phone');
const contactForm = $('#contactForm');

let contacts = [];

contactForm.on('submit', async e => {
  e.preventDefault();

  const newContact = {
    first: firstInput.val(),
    last: lastInput.val(),
    email: emailInput.val(),
    phone: phoneInput.val(),
  };

  const oldContact = contactForm.data('contact');
  let url = '/contacts-api/';
  if (oldContact) {
    url += oldContact.id;
  }
  try {
    const response = await fetch(url, {
      method: oldContact ? 'PUT' : 'POST',
      body: JSON.stringify(newContact),
      headers: {
        'content-type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    if (!oldContact) {
      // need to get new contacts id here

      addContact(newContact);
    } else {
      const tds = oldContact.row.find('td');
      tds[0].textContent = newContact.first;
      tds[1].textContent = newContact.last;
      tds[2].textContent = newContact.email;
      tds[3].textContent = newContact.phone;

      Object.assign(oldContact, newContact);
    }
    hideForm();
  } catch (e) {
    messageBox({ msg: e.message });
  }
});

function addContact(newContact) {
  if (!contacts.length) {
    // contactsTable[0].deleteRow(0);
    contactsTable.empty();
  }

  contacts.push(newContact);

  const row = $(`<tr>
                    <td>${newContact.first}</td>
                    <td>${newContact.last}</td>
                    <td>${newContact.email}</td>
                    <td>${newContact.phone}</td>
                    <td><button class="edit">edit</button> <button class="delete">delete</button></td>
                  </tr>`);

  newContact.row = row;
  contactsTable.append(row);

  row.find('.edit').click(async () => {
    showForm(newContact);
  });

  row.find('.delete').click(async () => {
    try {
      const response = await fetch(`/contacts-api/${newContact.id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(`${response.status} - ${response.statusText} - ${msg}`);
      }

      row.remove();

      contacts = contacts.filter(c => c !== newContact);

      if (!contacts.length) {
        contactsTable.html(`<tr>
          <td colspan="5">No contacts loaded</td>
        </tr>`);
      }
    } catch (e) {
      messageBox({ msg: e.message });
    }
  });
}

function showForm(contact) {
  if (contact) {
    firstInput.val(contact.first);
    lastInput.val(contact.last);
    emailInput.val(contact.email);
    phoneInput.val(contact.phone);

    contactForm.data('contact', contact);
  }
  contactForm.css('display', 'inline-block');
}

function hideForm() {
  // contactForm.reset();
  // contactForm[0].reset();

  contactForm.trigger('reset');

  contactForm.css('display', 'none');
};

$('#addContact').click(() => {
  showForm();
});

$('#cancel').click(() => {
  hideForm();
});

//contactsTable.empty();
//contacts = [];

try {
  const response = await fetch('/contacts-api/');
  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }
  const loadedContacts = await response.json();
  loadedContacts.forEach(addContact);
} catch (e) {
  messageBox({ msg: `Unable to load contacts - ${e.message}` });
}
