import mongoose, { Schema } from 'mongoose';
mongoose.set('runValidators', true);

const serviceScheme = new Schema({
    
    title: { type: String,  required: true },
    byline : { type: String,  required: true },
    content : { type: String,  required: true },
    imagePath: { type: String, default: '/services/no-service.jpg' },
    created: { type: Date, default : new Date() },

});

export default mongoose.models.service || mongoose.model('service', serviceScheme);