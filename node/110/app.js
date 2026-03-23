import mongoose from 'mongoose';
import Contact from './Contact.js';
import ContactList from './ContactList.js';

await mongoose.connect('mongodb://127.0.0.1:27017/contacts');

const potus = new Contact({name: 'Donald Trump', phone: '987654321'});
await potus.save();


const friends = new ContactList({name: 'friends', contacts: [potus]});
friends.populate('contacts');
friends.print();
friends.save();
