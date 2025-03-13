import mongoose from 'mongoose';
import Contact from './Contact.js';
import ContactList from  './ContactList.js';

await mongoose.connect('mongodb://127.0.0.1:27017/contacts');

const potus = new Contact({
  username: 'Donald Trump',
  phone: '1234567890'
});

const friends = new ContactList({
  name: 'Friends',
  contacts: [potus]
});

const coworkers = new ContactList({
  name: 'Coworkers',
  contacts: [potus]
});

await potus.save();

await friends.save();
await coworkers.save();

friends.print();
coworkers.print();


/*const restoredFriends = await ContactList.findOne({name: 'Friends'});//.populate('contacts');
const restoredCoworkers = await ContactList.findOne({ name: 'Coworkers' });//.populate('contacts');

restoredFriends.contacts[0].username = 'foo';

console.log(restoredFriends);
console.log(restoredCoworkers);

restoredFriends.print();
restoredCoworkers.print();*/

const reconstitutedLists = await ContactList.find().populate('contacts'); //.exec()
reconstitutedLists[0].contacts[0].username = 'foo';
reconstitutedLists[0].print();
reconstitutedLists[1].print();
