const User = require('../models/User');
const { generateToken } = require('../config/auth');
const { catchAsync } = require('../utils/errors');

// Register a new user
exports.register = catchAsync(async (req, res) => {
  const { email, name, password } = req.body;

  // Check if email already in use
  const existing = await User.findByEmail(email);
  if (existing) {
    return res.status(409).json({ error: 'Email is already registered' });
  }

  const user = await User.create({ email, name, password });
  const token = generateToken(user.id);

  res.status(201).json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      created_at: user.created_at
    },
    token
  });
});

// Login
exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findByEmail(email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const match = await User.comparePassword(password, user.password);
  if (!match) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const token = generateToken(user.id);

  res.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      created_at: user.created_at
    },
    token
  });
});

// Get current authenticated user
exports.getMe = catchAsync(async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json({ user });
});
