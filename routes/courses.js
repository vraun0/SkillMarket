const express = require('express');
const router = express.Router();
const courseModel = require('../models/course');
const authMiddleware = require('../utils/auth.js');
const appError = require('../utils/appError');
const asyncHandler = require('../utils/asyncHandler');

router.get('/', authMiddleware, asyncHandler(async (req, res) => {
  const courseIds = req.user.courseIds;

  if (!courseIds || courseIds.length === 0) {
    throw new appError("No courses found", 404);
  }

  const courseList = await Promise.all(
    courseIds.map(id => courseModel.findById(id))
  );

  res.json({ courseList });
}));

const courseSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  instructor: z.string(),
  tags: z.array(z.string()).optional(),
  price: z.number().min(0).optional(),
  thumbnail: z.string().url().optional(),
});


router.post('/create', authMiddleware, asyncHandler(async (req, res) => {
  if (!req.user.admin) {
    throw new appError("user is not an Admin", 400);
  }
  
  const parsed = courseSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new appError("Course validation failed", 400, parsed.error.errors);
  }

  await courseModel.create({
    title: req.body.title,
    description: req.body.description,
    instructor: req.user._id,
    tags: req.body.tags,
    price: req.body.price,
    thumbnail: req.body.thumbnail,
  });

  res.status(201).json({ message: "course created" });

}));


router.put('/update', authMiddleware, asyncHandler(async (req, res) => {
  if (!req.user.admin) {
    throw new appError("user is not an Admin", 400);
  }
  const parsed = courseSchema.partial().safeParse(req.body); // `partial()` allows partial updates

  if (!parsed.success) {
    throw new appError("Invalid update data", 400, parsed.error.errors);
  }

  const course = await courseModel.findByIdAndUpdate(req.params.id, parsed.data, {
    new: true,
    runValidators: true
  });

  if (!course) {
    throw new appError("Course not found", 404);
  }

  res.json({
    message: "Course updated",
    course
  });
}));


router.delete('/delete', authMiddleware, adminOnly, asyncHandler(async (req, res) => {
  if (!req.user.admin) {
    throw new appError("user is not an Admin", 400);
  }
  const course = await courseModel.findByIdAndDelete(req.params.id);

  if (!course) {
    throw new appError("Course not found", 404);
  }

  res.json({
    message: "Course deleted"
  });

}));

const purchaseSchema = z.object({
  courseId: z.string().length(24, "Invalid course ID"),
});

router.post('/purchase', authMiddleware, asyncHandler(async (req, res) => {
  if(req.user.admin){
    throw new appError("admins cannot purchase", 400);
  }

  const parsed = purchaseSchema.safeParse(req.body);

  if (!parsed.success) {
    throw new AppError("Invalid course ID", 400, parsed.error.errors);
  }

  const { courseId } = parsed.data;

  const course = await courseModel.findById(courseId);
  if (!course) {
    throw new AppError("Course not found", 404);
  }

  const user = await userModel.findById(req.user._id);
  if (user.courseIds.includes(courseId)) {
    throw new AppError("Course already purchased", 409);
  }

  user.courseIds.push(courseId);
  await user.save();

  res.status(200).json({
    message: "Course purchased successfully",
    courseId,
  });
}));

module.exports = router


