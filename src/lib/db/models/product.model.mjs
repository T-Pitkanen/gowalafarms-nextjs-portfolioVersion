import mongoose, { Schema } from 'mongoose';
mongoose.set('runValidators', true);

const productSchema = new Schema({
  title: { type: String, default: null },
  description: { type: String, default: null },
  imagePath: { type: String, default: '/products/no-product.jpg' },
  price: { type: Number, default: null },
  discountInPercent: { type: Number, default: null },
  exclusive: { type: Boolean, default: false },
  created : { type : Date, default: new Date() }
});

export default mongoose.models.product || mongoose.model('product', productSchema);