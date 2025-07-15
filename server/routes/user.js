const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/auth');
const asyncHandler = require('../utils/asyncHandler');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.post('/signup', asyncHandler(userController.signup));

router.post('/login', asyncHandler(authController.login));

router.get('/home', authMiddleware, userController.getHomePage);

module.exports = router;
