import { model, Schema } from 'mongoose';
import { Professional } from '../../entities/professional';

const professionalSchema = new Schema<Professional>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  company: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  assessment: {
    type: Number,
  },
  telephone: {
    type: Number,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
});

professionalSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject._id;
    delete returnedObject.password;
  },
});

export const ProfessionalModel = model(
  'Professional',
  professionalSchema,
  'professionals'
);
