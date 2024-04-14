import mongoose, { Schema } from 'mongoose';
mongoose.set('runValidators', true);

const contactSchema = new Schema({
  name: { type: String, default: null, required: true},
  email: { type: String, default: null, unique: true},
  message: { type: String, default: null, required: true },
  phone : { type : String, default: null, required: true },
  created : { type : Date, default: new Date(), required: true }
});

export default mongoose.models.contact || mongoose.model('contact', contactSchema);