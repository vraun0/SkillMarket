const bcrypt = require('bcrypt');
const { z } = require('zod');
const User = require('../models/user');
const generateToken = require('../utils/generateToken');
const AppError = require('../utils/appError');

exports.login = async (req, res) => {
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
    throw new AppError("User with that email not found", 404);
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new AppError("Incorrect password", 401);
  }

  const token = generateToken(user);

  res.status(200).json({
    status: 200,
    message: "Login successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      admin: user.admin
    }
  });
};
