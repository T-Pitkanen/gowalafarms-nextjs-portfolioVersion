import mongoose, { Schema } from 'mongoose';
mongoose.set('runValidators', true);

const articleSchema = new Schema({
  title: { type: String, default: null },
  imagePath: { type: String, default: '/articles/no-article.jpg' },
  category: { type: String, default: 'services' },
  body: { type: String, default: '' },
  checklist: { type: Array, default: [] },
  created : { type : Date, default: new Date() }
});

export default mongoose.models.article || mongoose.model('article', articleSchema);