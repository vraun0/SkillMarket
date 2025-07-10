const express = require('express');
const { z } = require('zod');
const bcrypt = require('bcrypt');
const { User } = require('../db');
const router = express.Router();
const { generateToken, authorization } = require('../auth');

router.use(express.json());


router.post('/signup', async (req, res) => {
  //helper utilities 
  const signupSchema = z.object({
    name: z.string().min(3).max(30),
    email: z.string().email().min(3).max(30),
    password: z.string().min(3).max(30),
  });
  const hashPassword = async (password) => {
    return await bcrypt.hash(password, 5);
  };

  const emailExists = async (email) => {
    const user = await User.findOne({ email, admin: false });
    return !!user;
  };

  //validitating the request body 
  const parsed = signupSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Validation failed",
      error: parsed.error.errors,
    });
  }

  const { name, email, password } = parsed.data;

  try {
    if (await emailExists(email)) {
      return res.status(409).json({ message: "Account already exists" });
    }

    const hashedPassword = await hashPassword(password);

    await User.create({
      name,
      email,
      password: hashedPassword,
      courseIds: [],
      admin: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json({ message: "You have been signed up" });

  } catch (error) {
    res.status(500).json({
      message: "Database error signing up",
      error: error.message || error,
    });
  }
});


router.post('/login', (req, res) => {



});

router.get('/home', (req, res) => {
  res.send('Hello World!');
});

module.exports = router

