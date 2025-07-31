const mongoose = require("mongoose");
const { maxLength } = require("zod");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    description: {
      type: String,
      maxlength: 5000,
    },
    instructor: {
      type: String,
      required: true,
      minlength: 3,
      maxLength: 30,
    },
    tags: [String],
    price: {
      type: Number,
      default: 0,
    },
    thumbnail: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Course", courseSchema);
