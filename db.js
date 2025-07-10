const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId


const UserSchema = new Schema({ 
  name: String, 
  email: String,
  password: String,
  courseIds: [ObjectId], 
  admin: Boolean,
  createdAt: Date,
  updatedAt: Date 
});

const CourseSchema = new Schema({ 
  name: String, 
  description: String, 
  price: Number,
  image: String,
  creatorId: ObjectId,
  createdAt: Date, 
  updatedAt: Date 
}); 

const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
  User,
  Course
};


