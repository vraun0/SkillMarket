const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    minlength: 3,
    maxlength: 100,
  },
  password: {
    type: String,
    required: true,
  },
  courseIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  }],
  admin: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
