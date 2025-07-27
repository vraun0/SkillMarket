const courseModel = require("../models/course");
const userModel = require("../models/user");
const appError = require("../utils/appError");
const { courseSchema, purchaseSchema } = require("../utils/validationSchemas");

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await courseModel.find();
    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch courses", error });
  }
};

exports.createCourse = async (req, res) => {
  if (!req.user.admin) {
    throw new appError("user is not an Admin", 400);
  }

  const parsed = courseSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new appError("Course validation failed", 400, parsed.error.errors);
  }

  const newCourse = await courseModel.create({
    title: req.body.title,
    description: req.body.description,
    instructor: req.user._id,
    tags: req.body.tags,
    price: req.body.price,
    thumbnail: req.body.thumbnail,
  });

  res.status(201).json({ message: "Course created", course: newCourse });
};

exports.updateCourse = async (req, res) => {
  if (!req.user.admin) {
    throw new appError("user is not an Admin", 400);
  }
  const parsed = courseSchema.partial().safeParse(req.body);

  if (!parsed.success) {
    throw new appError("Invalid update data", 400, parsed.error.errors);
  }

  const course = await courseModel.findByIdAndUpdate(
    req.params.id,
    parsed.data,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!course) {
    throw new appError("Course not found", 404);
  }

  res.json({ message: "Course updated", course });
};

exports.deleteCourse = async (req, res) => {
  if (!req.user.admin) {
    throw new appError("user is not an Admin", 400);
  }
  const course = await courseModel.findByIdAndDelete(req.params.id);

  if (!course) {
    throw new appError("Course not found", 404);
  }

  res.json({ message: "Course deleted" });
};

exports.purchaseCourse = async (req, res) => {
  if (req.user.admin) {
    throw new appError("Admins cannot purchase courses", 400);
  }
  const parsed = purchaseSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new appError("Invalid course ID", 400, parsed.error.errors);
  }
  const { courseId } = parsed.data;
  const course = await courseModel.findById(courseId);
  if (!course) {
    throw new appError("Course not found", 404);
  }
  const user = await userModel.findById(req.user._id);
  if (user.courseIds.includes(courseId)) {
    throw new appError("Course already purchased", 409);
  }
  user.courseIds.push(courseId);
  await user.save();
  res.status(200).json({ message: "Course purchased successfully", courseId });
};

exports.getYourCourses = async (req, res) => {
  const user = await userModel.findById(req.user._id).populate("courseIds");
  if (!user.courseIds || user.courseIds.length === 0) {
    return res.json({ courseList: [] });
  }
  res.json({ courseList: user.courseIds });
};
