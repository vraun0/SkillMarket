const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const jwtSecret = process.env.jwtSecret;


function authorization(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send('Access Denied');

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) return res.status(401).send('Access Denied');
    req.user = decoded.user;
    next();
  });
}




module.exports = authorization;
