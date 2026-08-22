const { body, param, query } = require('express-validator');

// Auth validators
const validateAuth = {
  register: [
    body('name')
      .notEmpty().withMessage('Name is required')
      .isLength({ max: 100 }).withMessage('Name must be less than 100 characters'),
    body('email')
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Valid email is required')
      .normalizeEmail(),
    body('password')
      .notEmpty().withMessage('Password is required')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  login: [
    body('email')
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Valid email is required')
      .normalizeEmail(),
    body('password')
      .notEmpty().withMessage('Password is required')
  ]
};

// Trip validators
const validateTrip = {
  create: [
    body('name')
      .notEmpty().withMessage('Trip name is required')
      .isLength({ max: 255 }).withMessage('Trip name must be less than 255 characters'),
    body('start_date')
      .notEmpty().withMessage('Start date is required')
      .isISO8601().withMessage('Valid start date is required'),
    body('end_date')
      .notEmpty().withMessage('End date is required')
      .isISO8601().withMessage('Valid end date is required'),
    body('description')
      .optional()
      .isString().withMessage('Description must be a string')
  ],
  update: [
    body('name')
      .optional()
      .notEmpty().withMessage('Trip name cannot be empty')
      .isLength({ max: 255 }).withMessage('Trip name must be less than 255 characters'),
    body('start_date')
      .optional()
      .isISO8601().withMessage('Valid start date is required'),
    body('end_date')
      .optional()
      .isISO8601().withMessage('Valid end date is required'),
    body('description')
      .optional()
      .isString().withMessage('Description must be a string')
  ],
  id: [
    param('id')
      .isUUID().withMessage('Invalid trip ID format')
  ]
};

// Stop validators
const validateStop = {
  create: [
    body('city_id')
      .notEmpty().withMessage('City ID is required'),
    body('city_name')
      .notEmpty().withMessage('City name is required')
      .isLength({ max: 255 }).withMessage('City name must be less than 255 characters'),
    body('city_country')
      .notEmpty().withMessage('Country is required')
      .isLength({ max: 100 }).withMessage('Country must be less than 100 characters'),
    body('start_date')
      .notEmpty().withMessage('Start date is required')
      .isISO8601().withMessage('Valid start date is required'),
    body('end_date')
      .notEmpty().withMessage('End date is required')
      .isISO8601().withMessage('Valid end date is required'),
    body('city_lat')
      .optional()
      .isFloat({ min: -90, max: 90 }).withMessage('Latitude must be between -90 and 90'),
    body('city_lng')
      .optional()
      .isFloat({ min: -180, max: 180 }).withMessage('Longitude must be between -180 and 180')
  ],
  reorder: [
    body('stopIds')
      .isArray().withMessage('Stop IDs must be an array')
      .notEmpty().withMessage('Stop IDs cannot be empty'),
    body('stopIds.*')
      .isUUID().withMessage('Invalid stop ID format')
  ],
  id: [
    param('stopId')
      .isUUID().withMessage('Invalid stop ID format')
  ],
  tripId: [
    param('tripId')
      .isUUID().withMessage('Invalid trip ID format')
  ]
};

// Itinerary validators
const validateItinerary = {
  tripId: [
    param('tripId')
      .isUUID().withMessage('Invalid trip ID format')
  ]
};

module.exports = {
  validateAuth,
  validateTrip,
  validateStop,
  validateItinerary
};