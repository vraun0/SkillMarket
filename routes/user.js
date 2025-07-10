const express = require('express')
const { z } = require('zod')
const bcrypt = require('bcrypt')
const { User } = require('../db.js')
const router = express.Router()


router.use(express.json());

router.post('/signup', (req, res) => {
  const requiredBody = z.object({
    name: z.string().min(3).max(30),
    email: z.string().email().min(3).max(30),
    password: z.string().min(3).max(30),
  })
  const parsedBody = requiredBody.safeParse(req.body);
  if (!parsedBody.success) {
    res.json({
      message: "body error",
      error: parsedBody.error
    });
  }
  const name = parsedBody.data.name;
  const email = parsedBody.data.email;
  const password = parsedBody.data.password;
  const courseIds = [];
  const admin = false;
  const createdAt = new Date();
  const updatedAt = new Date();

  async function passwordHash(password) {
    return await bcrypt.hash(password, 5);
  };

  async function createModel() {
    hashedPassword = await passwordHash(password);
    await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      courseIds: courseIds,
      admin: admin,
      createdAt: createdAt,
      updatedAt: updatedAt
    });
  };

  try {
    createModel();
    res.json({
      message: "You have been signed up"
    });

  } catch (error) {
    res.json({
      message: "database error signing up",
      error: error
    })
  }
});



router.post('/login', (req, res) => {

});

router.get('/home', (req, res) => {
  res.send('Hello World!');
});

module.exports = router

