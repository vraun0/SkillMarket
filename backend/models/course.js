const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  description: {
    type: String,
    maxlength: 1000,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',           
    required: true,
  },
  tags: [String],          
  price: {
    type: Number,
    default: 0,            
  },
  thumbnail: {
    type: String,           
  },
}, { timestamps: true });   

module.exports = mongoose.model('Course', courseSchema);
