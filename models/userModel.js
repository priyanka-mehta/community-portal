import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  familyId: String,
  fname: String,
  mname: String,
  lname: String,
  relation: String,
  dob: String,
  email: {
    type: String,
    required: false,
    unique: true
  },
  gender: {
    type: String,
    required: false
  },
  mobileNumber: {
    type: Number,
    required: true
  }
});

const User = models.User || model('User', userSchema);

export default User;
