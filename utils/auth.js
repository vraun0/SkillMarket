const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const User = require('../models/user');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError('Authentication required', 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.jwtSecret, {expiresIn : '7d'});
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new AppError('User not found', 401);
    }

    req.user = user; 
    next();
  } catch (err) {
    next(new AppError('Invalid or expired token', 401));
  }
};

module.exports = authMiddleware;
