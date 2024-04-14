import mongoose, { Schema } from 'mongoose';
mongoose.set('runValidators', true);

const basketSchema = new Schema({
  email: { type: String, required: true },
  products: { type: Array, required: true },
  created : { type : Date, default: new Date() }
});

export default mongoose.models.basket || mongoose.model('basket', basketSchema);