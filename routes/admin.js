const express = require('express');
const bcrypt = require('bcrypt');
const { z } = require('zod');
const User = require('../models/user');
const generateToken = require('../utils/generateToken');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/appError');
const authMiddleware = require('../utils/auth');
const path = require('path');

const router = express.Router();


router.use(express.json());

router.post('/signup', asyncHandler(async (req, res) => {
  const signupSchema = z.object({
    name: z.string().min(3).max(30),
    email: z.string().email().min(3).max(30),
    password: z.string().min(3).max(30),
  });
  
  const parsed = signupSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new AppError("Input Validation Failed", 400, parsed.error.errors)
  }

  const { name, email, password } = parsed.data;

  if (await User.findOne({email : email, admin : true})) {
    throw new AppError("User already exists",409)
  }

  const hashedPassword = await bcrypt.hash(password, 5);

  await User.create({
      name,
      email,
      password: hashedPassword,
      courseIds: [],
      admin: true,
  });

  res.status(201).json({ message: "You have been signed up" });

}));



router.post('/login', asyncHandler(async (req, res, next) => {
  const schema = z.object({
    email: z.string().email().min(3).max(30),
    password: z.string().min(3).max(30),
  });

  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    throw new AppError("Validation failed", 400, parsed.error.errors);
  }

  const { email, password } = parsed.data;
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("User not found", 404);
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new AppError("Incorrect password", 401);
  }

  const token = generateToken(user);
  res.status(200).json({
    status: 200,
    token,
    user:{
      id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      admin: user.admin
    }
  });
}));



router.get('/home', authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});


module.exports = router
