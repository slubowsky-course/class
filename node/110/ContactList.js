import mongoose, { SchemaTypes } from 'mongoose';
const { Schema } = mongoose;

const contactListSchema = new Schema({
  name: { type: String, required: true },
  contacts: [{type: SchemaTypes.ObjectId}, {ref: 'Contact'}]
});

contactListSchema.methods.print = function() {
  console.log(`contact list: ${this.name}`);

  this.contacts.forEach(c => `name: ${c.name}`);
}

export default mongoose.model('ContactList', contactListSchema);
