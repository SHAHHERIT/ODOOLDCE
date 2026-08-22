const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// JWT Configuration
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key_change_this';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '30d';

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

// Generate Refresh Token
const generateRefreshToken = (userId) => {
  return jwt.sign(
    { userId, type: 'refresh' },
    JWT_SECRET,
    { expiresIn: JWT_REFRESH_EXPIRES_IN }
  );
};

// Verify Token
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};

// Hash Password
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// Compare Password
const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

// Extract Token from Header
const extractTokenFromHeader = (req) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return null;
  }
  
  // Check if it's a Bearer token
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return null;
  }
  
  return parts[1];
};

// Decode Token (without verification)
const decodeToken = (token) => {
  try {
    return jwt.decode(token);
  } catch (error) {
    return null;
  }
};

// Check if Token is Expired
const isTokenExpired = (token) => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) {
    return true;
  }
  return Date.now() >= decoded.exp * 1000;
};

// Get Token Expiry Time
const getTokenExpiry = (token) => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) {
    return null;
  }
  return new Date(decoded.exp * 1000);
};

// Middleware: Authenticate Request
const authenticate = (req, res, next) => {
  const token = extractTokenFromHeader(req);
  
  if (!token) {
    return res.status(401).json({
      error: 'No token provided',
      message: 'Authentication required'
    });
  }
  
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({
      error: 'Invalid token',
      message: 'Token is invalid or expired'
    });
  }
  
  req.userId = decoded.userId;
  req.token = token;
  next();
};

// Middleware: Optional Authentication
const optionalAuthenticate = (req, res, next) => {
  const token = extractTokenFromHeader(req);
  
  if (token) {
    const decoded = verifyToken(token);
    if (decoded) {
      req.userId = decoded.userId;
      req.token = token;
    }
  }
  
  next();
};

// Generate Auth Response
const generateAuthResponse = (user, tokens = {}) => {
  const response = {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      created_at: user.created_at
    }
  };
  
  if (tokens.accessToken) {
    response.accessToken = tokens.accessToken;
  }
  
  if (tokens.refreshToken) {
    response.refreshToken = tokens.refreshToken;
  }
  
  return response;
};

// Create Session Data
const createSessionData = (userId, userAgent, ip) => {
  return {
    userId,
    userAgent,
    ip,
    createdAt: new Date().toISOString()
  };
};

module.exports = {
  // Constants
  JWT_SECRET,
  JWT_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN,
  
  // Token Functions
  generateToken,
  generateRefreshToken,
  verifyToken,
  decodeToken,
  isTokenExpired,
  getTokenExpiry,
  extractTokenFromHeader,
  
  // Password Functions
  hashPassword,
  comparePassword,
  
  // Middleware
  authenticate,
  optionalAuthenticate,
  
  // Helpers
  generateAuthResponse,
  createSessionData
};