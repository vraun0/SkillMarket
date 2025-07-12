const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const jwtSecret = process.env.jwtSecret;

function generateToken(user) {
  return jwt.sign({id: user._id }, jwtSecret);
}

module.exports = generateToken;
