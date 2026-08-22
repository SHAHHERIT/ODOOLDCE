const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const { authMiddleware } = require('../middleware/auth');
const { validateAuth } = require('../utils/validators');
const { validateRequest } = require('../middleware/validation');

// Register
router.post('/register', validateAuth.register, validateRequest, register);

// Login
router.post('/login', validateAuth.login, validateRequest, login);

// Get current user (protected)
router.get('/me', authMiddleware, getMe);

module.exports = router;
