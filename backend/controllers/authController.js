const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

/**
 * Generate a signed JWT for the given user.
 */
function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

/**
 * POST /auth/signup
 * Create a new user account.
 *
 * Body: { name, email, password }
 */
async function signup(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'name, email, and password are required.' });
    }

    // Check for existing user
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: 'A user with this email already exists.' });
    }

    // Hash password and create user
    const hash = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, password: hash });

    const token = signToken(user);

    return res.status(201).json({
      message: 'Account created successfully.',
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    console.error('Signup error:', error.message);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}

/**
 * POST /auth/login
 * Authenticate a user and return a JWT.
 *
 * Body: { email, password }
 */
async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required.' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = signToken(user);

    return res.json({
      message: 'Login successful.',
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    console.error('Login error:', error.message);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}

module.exports = { signup, login };
