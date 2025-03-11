const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: 3
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      'Please enter a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 8,
    match: [
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number'
    ]
  }
  ,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
},
  {
    timestamps: true,

  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;