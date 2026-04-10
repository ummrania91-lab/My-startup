const express = require('express');
const { signup, login } = require('../controllers/authController');

const router = express.Router();

// POST /auth/signup — create a new user account
router.post('/signup', signup);

// POST /auth/login — authenticate and receive a JWT
router.post('/login', login);

module.exports = router;
