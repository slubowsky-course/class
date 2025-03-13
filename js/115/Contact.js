import mongoose from 'mongoose';
const { Schema } = mongoose;

const contactSchema = new Schema({
  username: { type: String, required: true },
  phone: { type: String, required: true }
});

export default mongoose.model('Contact', contactSchema);
