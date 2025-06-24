import { Schema, model } from 'mongoose';
import { saveErrorHandler, setUpdateSettings } from './hooks.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: true,
      default: 'personal',
    },
  },
  { versionKey: false, timestamps: true },
);
contactSchema.post('save', saveErrorHandler);
contactSchema.post('findOneAndUpdate', setUpdateSettings);
contactSchema.post('findOneAndUpdate', saveErrorHandler);
const Contact = model('Contact', contactSchema);

export default Contact;
