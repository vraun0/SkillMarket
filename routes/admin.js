const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/auth');
const asyncHandler = require('../utils/asyncHandler');

const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');

router.post('/signup', asyncHandler(adminController.signup));

router.post('/login', asyncHandler(authController.login));

router.get('/home', authMiddleware, adminController.getHomePage);

module.exports = router;
