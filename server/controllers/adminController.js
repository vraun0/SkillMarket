const bcrypt = require('bcrypt');
const { z } = require('zod');
const User = require('../models/user');
const AppError = require('../utils/appError');
const path = require('path');

exports.signup = async (req, res) => {
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

  if (await User.findOne({ email: email, admin: true })) {
    throw new AppError("Admin with this email already exists", 409)
  }

  const hashedPassword = await bcrypt.hash(password, 10); 

  await User.create({
      name,
      email,
      password: hashedPassword,
      courseIds: [],
      admin: true, 
  });

  res.status(201).json({ message: "Admin account created successfully" });
};

exports.getHomePage = (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
};
