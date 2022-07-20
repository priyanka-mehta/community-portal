import { Schema, model, models } from 'mongoose';

const testSchema = new Schema({
  fname: String,
  mname: String,
  lname: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  gender: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: Number,
    required: true
  }
});

const Test = models.Test || model('Test', testSchema);

export default Test;
