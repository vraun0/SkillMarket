const express = require("express");
const router = express.Router();
const authMiddleware = require("../utils/auth.js");
const asyncHandler = require("../utils/asyncHandler");

const courseController = require("../controllers/courseController");

router.get(
  "/get",
  authMiddleware,
  asyncHandler(courseController.getYourCourses),
);

router.get(
  "/getAll",
  asyncHandler(courseController.getAllCourses),
);

router.post(
  "/create",
  authMiddleware,
  asyncHandler(courseController.createCourse),
);

router.put(
  "/update/:id",
  authMiddleware,
  asyncHandler(courseController.updateCourse),
);

router.delete(
  "/delete/:id",
  authMiddleware,
  asyncHandler(courseController.deleteCourse),
);

router.post(
  "/purchase",
  authMiddleware,
  asyncHandler(courseController.purchaseCourse),
);

module.exports = router;
