import mongoose from 'mongoose';
import Contact from './Contact.js';
import ContactList from './ContactList.js';

await mongoose.connect('mongodb://127.0.0.1:27017/contacts');

const potus = new Contact({name: 'Donald Trump', phone: '987654321'});
await potus.save();


const friends = new ContactList({name: 'friends', contacts: [potus]});
friends.print();
await friends.save();

const coworkers = new ContactList({ name: 'coworkers', contacts: [potus] });
coworkers.print();
await coworkers.save();

const reconstitudedLists = await ContactList.find().populate('contacts');
reconstitudedLists[0].contacts[0].name = 'foo';
reconstitudedLists[0].print();
reconstitudedLists[1].print();
